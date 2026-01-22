import { Module } from '@nestjs/common';
import { UsersHasShortlinksService } from './users_has_shortlinks.service';
import { UsersHasShortlinksController } from './users_has_shortlinks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersHasShortlink } from './entities/users_has_shortlink.entity';

@Module({
  controllers: [UsersHasShortlinksController],
  providers: [UsersHasShortlinksService],
  imports: [TypeOrmModule.forFeature([UsersHasShortlink])],
  exports: [UsersHasShortlinksService],
})
export class UsersHasShortlinksModule { }
