import { Controller } from '@nestjs/common';
import { UsersHasShortlinksService } from './users_has_shortlinks.service';

@Controller('users-has-shortlinks')
export class UsersHasShortlinksController {
  constructor(private readonly usersHasShortlinksService: UsersHasShortlinksService) {}
}
