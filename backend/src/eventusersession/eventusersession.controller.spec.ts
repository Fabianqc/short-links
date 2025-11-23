import { Test, TestingModule } from '@nestjs/testing';
import { EventusersessionController } from './eventusersession.controller';
import { EventusersessionService } from './eventusersession.service';

describe('EventusersessionController', () => {
  let controller: EventusersessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventusersessionController],
      providers: [EventusersessionService],
    }).compile();

    controller = module.get<EventusersessionController>(EventusersessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
