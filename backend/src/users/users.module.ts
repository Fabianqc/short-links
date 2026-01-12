import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashingService } from '../common/providers/hashing/hashing.service';
import { EventusersessionModule } from '../eventusersession/eventusersession.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => EventusersessionModule)],
  controllers: [UsersController],
  providers: [UsersService, HashingService],
  exports: [UsersService],
})
export class UsersModule {}
