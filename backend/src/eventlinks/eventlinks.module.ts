import { Module } from '@nestjs/common';
import { EventlinksService } from './eventlinks.service';
import { EventlinksController } from './eventlinks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eventlink } from './entities/eventlink.entity';
import { ShortlinksModule } from 'src/shortlinks/shortlinks.module';
import { UsersHasShortlinksModule } from 'src/users_has_shortlinks/users_has_shortlinks.module';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  controllers: [EventlinksController],
  providers: [EventlinksService],
  imports: [
    TypeOrmModule.forFeature([Eventlink]),
    ShortlinksModule,
    UsersHasShortlinksModule,
    StatisticsModule,
  ],
})
export class EventlinksModule { }
