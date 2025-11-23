import { Test, TestingModule } from '@nestjs/testing';
import { EventlinksController } from './eventlinks.controller';
import { EventlinksService } from './eventlinks.service';

describe('EventlinksController', () => {
  let controller: EventlinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventlinksController],
      providers: [EventlinksService],
    }).compile();

    controller = module.get<EventlinksController>(EventlinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
