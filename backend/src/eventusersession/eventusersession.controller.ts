import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventusersessionService } from './eventusersession.service';
import { CreateEventusersessionDto } from './dto/create-eventusersession.dto';
import { UpdateEventusersessionDto } from './dto/update-eventusersession.dto';

@Controller('eventusersession')
export class EventusersessionController {
  constructor(private readonly eventusersessionService: EventusersessionService) {}

  @Post()
  create(@Body() createEventusersessionDto: CreateEventusersessionDto) {
    return this.eventusersessionService.create(createEventusersessionDto);
  }

  @Get()
  findAll() {
    return this.eventusersessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventusersessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventusersessionDto: UpdateEventusersessionDto) {
    return this.eventusersessionService.update(+id, updateEventusersessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventusersessionService.remove(+id);
  }
}
