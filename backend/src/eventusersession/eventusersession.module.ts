import { Module } from '@nestjs/common';
import { EventusersessionService } from './eventusersession.service';
import { EventusersessionController } from './eventusersession.controller';

@Module({
  controllers: [EventusersessionController],
  providers: [EventusersessionService],
})
export class EventusersessionModule {}
