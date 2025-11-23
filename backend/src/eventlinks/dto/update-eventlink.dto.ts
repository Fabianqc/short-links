import { PartialType } from '@nestjs/mapped-types';
import { CreateEventlinkDto } from './create-eventlink.dto';

export class UpdateEventlinkDto extends PartialType(CreateEventlinkDto) {}
