import { Module } from '@nestjs/common';
import { EventlinksService } from './eventlinks.service';
import { EventlinksController } from './eventlinks.controller';

@Module({
  controllers: [EventlinksController],
  providers: [EventlinksService],
})
export class EventlinksModule {}
