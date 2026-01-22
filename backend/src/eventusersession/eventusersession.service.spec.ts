import { Test, TestingModule } from '@nestjs/testing';
import { EventusersessionService } from './eventusersession.service';

describe('EventusersessionService', () => {
  let service: EventusersessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventusersessionService],
    }).compile();

    service = module.get<EventusersessionService>(EventusersessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
