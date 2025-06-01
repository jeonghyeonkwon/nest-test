import { Test, TestingModule } from '@nestjs/testing';
import { SeparationController } from './separation.controller';
import { SeparationService } from './separation.service';

describe('SeparationController', () => {
  let controller: SeparationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeparationController],
      providers: [SeparationService],
    }).compile();

    controller = module.get<SeparationController>(SeparationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
