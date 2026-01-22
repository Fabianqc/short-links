import { Module } from '@nestjs/common';
import { EventusersessionService } from './eventusersession.service';
import { EventusersessionController } from './eventusersession.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eventusersession } from './entities/eventusersession.entity';
import { UsersModule } from 'src/users/users.module';
import { forwardRef } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [EventusersessionController],
  providers: [EventusersessionService],
  imports: [TypeOrmModule.forFeature([Eventusersession, User]), forwardRef(() => UsersModule)],
  exports: [EventusersessionService]
})
export class EventusersessionModule {}
