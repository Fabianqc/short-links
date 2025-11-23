import { Test, TestingModule } from '@nestjs/testing';
import { UsersHasShortlinksService } from './users_has_shortlinks.service';

describe('UsersHasShortlinksService', () => {
  let service: UsersHasShortlinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersHasShortlinksService],
    }).compile();

    service = module.get<UsersHasShortlinksService>(UsersHasShortlinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
