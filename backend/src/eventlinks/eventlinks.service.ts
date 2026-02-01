import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEventlinkDto } from './dto/create-eventlink.dto';
import { UpdateEventlinkDto } from './dto/update-eventlink.dto';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Eventlink, EventLinkType } from './entities/eventlink.entity';
import { ShortlinksService } from 'src/shortlinks/shortlinks.service';
import { UsersHasShortlinksService } from 'src/users_has_shortlinks/users_has_shortlinks.service';
import ActiveUserInterface from 'src/common/interface/active-user.interface';
import { UUID } from 'crypto';
import { Shortlink } from 'src/shortlinks/entities/shortlink.entity';
import { UsersHasShortlink } from 'src/users_has_shortlinks/entities/users_has_shortlink.entity';
import { StatisticsService } from 'src/statistics/statistics.service';
import { CreateStatisticDto } from 'src/statistics/dto/create-statistic.dto';
import { UAParser } from 'ua-parser-js';
import * as geoip from 'geoip-lite';



@Injectable()
export class EventlinksService {

  constructor(
    @InjectRepository(Eventlink)
    private readonly eventlinkRepository: Repository<Eventlink>,
    private readonly shortlinksService: ShortlinksService,
    private readonly usersHasShortlinksService: UsersHasShortlinksService,
    private readonly dataSource: DataSource,
    private readonly statisticsService: StatisticsService,
  ) { }

  async createEventlink(user: ActiveUserInterface, createEventlinkDto: CreateEventlinkDto) {
    // we create a transaction with the dataSource
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // if something goes wrong we rollback the transaction
    try {
      const shortlink = await this.shortlinksService.createShortLink(createEventlinkDto, queryRunner.manager);
      // if shortlink is not created we throw an error
      if (!shortlink) {
        throw new InternalServerErrorException('Shortlink not created');
      }
      // we create the usersHasShortlink instance
      const usersHasShortlink = await this.usersHasShortlinksService.createUsersHasShortlink(user.userId, shortlink.id, queryRunner.manager);
      // if usersHasShortlink is not created we throw an error
      if (!usersHasShortlink) {
        throw new InternalServerErrorException('UsersHasShortlink not created');
      }
      // we create the eventlink instance
      const eventlink = this.eventlinkRepository.create({
        shortlinkId: shortlink.id,
        eventLinks: EventLinkType.CREATED,
        description: 'Eventlink created',
        eventTime: new Date(),
      });
      // we save the eventlink instance
      const savedEventLink = await queryRunner.manager.save(eventlink);
      // we commit the transaction
      await queryRunner.commitTransaction();
      return savedEventLink;
    } catch (error) {
      // if something goes wrong we rollback the transaction
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // we release the transaction
      await queryRunner.release();
    }
  }

  async searchEventLinkByShortlinkUrl(shortlinkUrl: string, req: any) {
    const shortlink = await this.shortlinksService.findShortLinkByShortUrl(shortlinkUrl);
    if (!shortlink) {
      throw new NotFoundException('Shortlink not found');
    }
    const userAgentHeader = req.headers['user-agent'] || '';
    const parser = new UAParser(userAgentHeader);
    const result = parser.getResult();

    let ip = req.clientIp || req.headers['x-forwarded-for'] || req.socket.remoteAddress || "";
    if (Array.isArray(ip)) {
      ip = ip[0];
    }
    if (ip.includes(',')) {
      ip = ip.split(',')[0];
    }
    if (ip === '::1' || ip === '127.0.0.1') ip = '8.8.8.8';
    const geo = geoip.lookup(ip);
    const referrer = req.headers['referer'] || req.headers['Referrer'] || 'direct';

    const newStatisticDto: CreateStatisticDto = {
      ip: ip,
      country: geo?.country || 'Unknown',
      city: geo?.city || 'Unknown',
      browser: result.browser.name || 'Unknown',
      os: result.os.name || 'Unknown',
      device: result.device.type || 'Desktop',
      referrer: referrer,
      idShortlink: shortlink.id,
      visitedAt: new Date(),
    }

    await this.statisticsService.createStatistic(newStatisticDto);


    return shortlink.url;
  }

  async findAllByUserId(userId: UUID) {
    const linksIdUser: UsersHasShortlink[] = await this.usersHasShortlinksService.findAllByUserId(userId);
    if (linksIdUser.length === 0) {
      throw new NotFoundException('Links not found');
    }
    const promises = linksIdUser.map((Link: UsersHasShortlink) => this.shortlinksService.findShortLinkById(Link.shortlinkId))
    const links = await Promise.all(promises)
    if (links.length === 0) {
      throw new NotFoundException('Links not found');
    }
    let linksOrdered = links.sort((a: Shortlink, b: Shortlink) => b.count - a.count)
    if (linksOrdered.length > 6) {
      linksOrdered = linksOrdered.slice(0, 6)
    }
    return linksOrdered;


  }
}
