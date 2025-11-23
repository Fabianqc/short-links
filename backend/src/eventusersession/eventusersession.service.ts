import { Injectable } from '@nestjs/common';
import { CreateEventusersessionDto } from './dto/create-eventusersession.dto';
import { UpdateEventusersessionDto } from './dto/update-eventusersession.dto';

@Injectable()
export class EventusersessionService {
  create(createEventusersessionDto: CreateEventusersessionDto) {
    return 'This action adds a new eventusersession';
  }

  findAll() {
    return `This action returns all eventusersession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventusersession`;
  }

  update(id: number, updateEventusersessionDto: UpdateEventusersessionDto) {
    return `This action updates a #${id} eventusersession`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventusersession`;
  }
}
