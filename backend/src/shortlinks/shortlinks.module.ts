import { Module } from '@nestjs/common';
import { ShortlinksService } from './shortlinks.service';
import { ShortlinksController } from './shortlinks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shortlink } from './entities/shortlink.entity';



@Module({
  controllers: [ShortlinksController],
  providers: [ShortlinksService],
  imports: [TypeOrmModule.forFeature([Shortlink])],
  exports: [ShortlinksService],
})
export class ShortlinksModule { }
