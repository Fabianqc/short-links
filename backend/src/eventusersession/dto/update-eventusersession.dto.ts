import { PartialType } from '@nestjs/mapped-types';
import { CreateEventusersessionDto } from './create-eventusersession.dto';

export class UpdateEventusersessionDto extends PartialType(CreateEventusersessionDto) {}
