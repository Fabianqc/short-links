import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEventlinkDto } from './dto/create-eventlink.dto';
import { UpdateEventlinkDto } from './dto/update-eventlink.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Eventlink, EventLinkType } from './entities/eventlink.entity';
import { ShortlinksService } from 'src/shortlinks/shortlinks.service';
import { UsersHasShortlinksService } from 'src/users_has_shortlinks/users_has_shortlinks.service';

@Injectable()
export class EventlinksService {

  constructor(
    @InjectRepository(Eventlink)
    private readonly eventlinkRepository: Repository<Eventlink>,
    private readonly shortlinksService: ShortlinksService,
    private readonly usersHasShortlinksService: UsersHasShortlinksService,
    private readonly dataSource: DataSource,
  ) { }

  async createEventlink(user: User, createEventlinkDto: CreateEventlinkDto) {
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
      const usersHasShortlink = await this.usersHasShortlinksService.createUsersHasShortlink(user.id, shortlink.id, queryRunner.manager);
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
}
