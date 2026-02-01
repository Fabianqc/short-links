import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShortlinkDto } from './dto/create-shortlink.dto';
import { Repository, EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Shortlink } from './entities/shortlink.entity';
import { UUID } from 'crypto';

@Injectable()
export class ShortlinksService {
    constructor(
        @InjectRepository(Shortlink)
        private readonly shortlinkRepository: Repository<Shortlink>,
    ) { }
    private encodeBase62(num: number): string {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let encoded = "";
        while (num > 0) {
            encoded = chars[num % 62] + encoded;
            num = Math.floor(num / 62);
        }
        return encoded || "0";
    }


    async createShortLink(createShortlinkDto: CreateShortlinkDto, manager?: EntityManager) {
        const repo = manager ? manager.getRepository(Shortlink) : this.shortlinkRepository;
        //we create the instance typeorm for shortlink
        let shortlink = repo.create(createShortlinkDto);
        shortlink.shortUrl = ""
        // We save the empty shortlink instance in the database
        shortlink = await repo.save(shortlink);
        // We encode the shortlink count to base62
        shortlink.shortUrl = this.encodeBase62(shortlink.count);
        // We save the shortlink instance in the database
        await repo.save(shortlink);
        return shortlink;
    }

    async findShortLinkById(id: UUID) {
        const shortlink = await this.shortlinkRepository.findOne({ where: { id } });
        if (!shortlink) {
            throw new NotFoundException('Shortlink not found');
        }
        return shortlink;
    }

    async findShortLinkByShortUrl(shortUrl: string) {
        const shortlink = await this.shortlinkRepository.findOne({ where: { shortUrl } });
        if (!shortlink) {
            throw new NotFoundException('Shortlink not found');
        }
        return shortlink;
    }
}
