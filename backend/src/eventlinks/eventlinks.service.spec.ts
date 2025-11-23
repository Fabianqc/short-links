import { Test, TestingModule } from '@nestjs/testing';
import { EventlinksService } from './eventlinks.service';

describe('EventlinksService', () => {
  let service: EventlinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventlinksService],
    }).compile();

    service = module.get<EventlinksService>(EventlinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
