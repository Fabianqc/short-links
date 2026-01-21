import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventlinksService } from './eventlinks.service';
import { CreateEventlinkDto } from './dto/create-eventlink.dto';
import { UpdateEventlinkDto } from './dto/update-eventlink.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UseInterceptors } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
@Controller('eventlinks')
export class EventlinksController {
  constructor(private readonly eventlinksService: EventlinksService) {}

    @Post()
    create(@ActiveUser() user: User, @Body() createEventlinkDto: CreateEventlinkDto) {
        return this.eventlinksService.createEventlink(user, createEventlinkDto);
    }
    
}
