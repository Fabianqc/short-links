import { Injectable } from '@nestjs/common';
import { CreateUsersHasShortlinkDto } from './dto/create-users_has_shortlink.dto';
import { UpdateUsersHasShortlinkDto } from './dto/update-users_has_shortlink.dto';

@Injectable()
export class UsersHasShortlinksService {
  create(createUsersHasShortlinkDto: CreateUsersHasShortlinkDto) {
    return 'This action adds a new usersHasShortlink';
  }

  findAll() {
    return `This action returns all usersHasShortlinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersHasShortlink`;
  }

  update(id: number, updateUsersHasShortlinkDto: UpdateUsersHasShortlinkDto) {
    return `This action updates a #${id} usersHasShortlink`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersHasShortlink`;
  }
}
