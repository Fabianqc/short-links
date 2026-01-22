import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersHasShortlinkDto } from './create-users_has_shortlink.dto';

export class UpdateUsersHasShortlinkDto extends PartialType(CreateUsersHasShortlinkDto) {}
