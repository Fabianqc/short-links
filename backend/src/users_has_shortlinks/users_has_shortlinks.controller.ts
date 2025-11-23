import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersHasShortlinksService } from './users_has_shortlinks.service';
import { CreateUsersHasShortlinkDto } from './dto/create-users_has_shortlink.dto';
import { UpdateUsersHasShortlinkDto } from './dto/update-users_has_shortlink.dto';

@Controller('users-has-shortlinks')
export class UsersHasShortlinksController {
  constructor(private readonly usersHasShortlinksService: UsersHasShortlinksService) {}

  @Post()
  create(@Body() createUsersHasShortlinkDto: CreateUsersHasShortlinkDto) {
    return this.usersHasShortlinksService.create(createUsersHasShortlinkDto);
  }

  @Get()
  findAll() {
    return this.usersHasShortlinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersHasShortlinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersHasShortlinkDto: UpdateUsersHasShortlinkDto) {
    return this.usersHasShortlinksService.update(+id, updateUsersHasShortlinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersHasShortlinksService.remove(+id);
  }
}
