import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventlinksService } from './eventlinks.service';
import { CreateEventlinkDto } from './dto/create-eventlink.dto';
import { UpdateEventlinkDto } from './dto/update-eventlink.dto';

@Controller('eventlinks')
export class EventlinksController {
  constructor(private readonly eventlinksService: EventlinksService) {}

  @Post()
  create(@Body() createEventlinkDto: CreateEventlinkDto) {
    return this.eventlinksService.create(createEventlinkDto);
  }

  @Get()
  findAll() {
    return this.eventlinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventlinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventlinkDto: UpdateEventlinkDto) {
    return this.eventlinksService.update(+id, updateEventlinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventlinksService.remove(+id);
  }
}
