import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersHasShortlink } from './entities/users_has_shortlink.entity';
import { UUID } from 'crypto';

@Injectable()
export class UsersHasShortlinksService {
  constructor(
    @InjectRepository(UsersHasShortlink)
    private readonly usersHasShortlinksRepository: Repository<UsersHasShortlink>,
  ) { }

  async createUsersHasShortlink(userId: UUID, shortlinkId: UUID, manager?: EntityManager) {
    if (!userId || !shortlinkId) {
      throw new BadRequestException('User id and shortlink id are required');
    }

    const repo = manager ? manager.getRepository(UsersHasShortlink) : this.usersHasShortlinksRepository;

    const usersHasShortlink = repo.create({
      userId,
      shortlinkId,
    });
    return repo.save(usersHasShortlink);
  }

  findAllByUserId(userId: UUID) {
    return this.usersHasShortlinksRepository.find({ where: { userId }});
  }

}
