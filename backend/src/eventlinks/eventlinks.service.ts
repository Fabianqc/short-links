import { Injectable } from '@nestjs/common';
import { CreateEventlinkDto } from './dto/create-eventlink.dto';
import { UpdateEventlinkDto } from './dto/update-eventlink.dto';

@Injectable()
export class EventlinksService {
  create(createEventlinkDto: CreateEventlinkDto) {
    return 'This action adds a new eventlink';
  }

  findAll() {
    return `This action returns all eventlinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventlink`;
  }

  update(id: number, updateEventlinkDto: UpdateEventlinkDto) {
    return `This action updates a #${id} eventlink`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventlink`;
  }
}
