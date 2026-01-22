import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventusersessionService } from './eventusersession.service';
import { CreateEventusersessionDto } from './dto/create-eventusersession.dto';
import { UpdateEventusersessionDto } from './dto/update-eventusersession.dto';
import { JwtAuthGuard } from '../common/guards/api-key/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { LogoutDto } from '../auth/dto/logout.dto';

@Controller('eventusersession')
@UseGuards(JwtAuthGuard)
export class EventusersessionController {
  constructor(private readonly eventusersessionService: EventusersessionService) {}
}
