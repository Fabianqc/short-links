import { Controller, Get, Post, Body, Param, } from '@nestjs/common';
import { EventlinksService } from './eventlinks.service';
import { CreateEventlinkDto } from './dto/create-eventlink.dto';
import { UpdateEventlinkDto } from './dto/update-eventlink.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import ActiveUserInterface from 'src/common/interface/active-user.interface';
import { UseInterceptors } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';


@Controller('eventlinks')
export class EventlinksController {
  constructor(private readonly eventlinksService: EventlinksService) {}

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard('jwt'))
    create(@ActiveUser() user: ActiveUserInterface, @Body() createEventlinkDto: CreateEventlinkDto) {
        return this.eventlinksService.createEventlink(user, createEventlinkDto);
    }
    
    @Get(':shortlinkUrl')
    redirect(@Param('shortlinkUrl') shortlinkUrl: string) {
        return this.eventlinksService.searchEventLinkByShortlinkUrl(shortlinkUrl)
    }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard('jwt'))
    findAllByUserId(@ActiveUser() user: ActiveUserInterface) {
        return this.eventlinksService.findAllByUserId(user.userId)
    }
}
