import { Test, TestingModule } from '@nestjs/testing';
import { ChanelController } from './chanel.controller';

describe('ChanelController', () => {
  let controller: ChanelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChanelController],
    }).compile();

    controller = module.get<ChanelController>(ChanelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
