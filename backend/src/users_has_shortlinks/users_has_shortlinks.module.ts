import { Module } from '@nestjs/common';
import { UsersHasShortlinksService } from './users_has_shortlinks.service';
import { UsersHasShortlinksController } from './users_has_shortlinks.controller';

@Module({
  controllers: [UsersHasShortlinksController],
  providers: [UsersHasShortlinksService],
})
export class UsersHasShortlinksModule {}
