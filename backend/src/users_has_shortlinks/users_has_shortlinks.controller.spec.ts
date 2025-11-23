import { Test, TestingModule } from '@nestjs/testing';
import { UsersHasShortlinksController } from './users_has_shortlinks.controller';
import { UsersHasShortlinksService } from './users_has_shortlinks.service';

describe('UsersHasShortlinksController', () => {
  let controller: UsersHasShortlinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersHasShortlinksController],
      providers: [UsersHasShortlinksService],
    }).compile();

    controller = module.get<UsersHasShortlinksController>(UsersHasShortlinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
