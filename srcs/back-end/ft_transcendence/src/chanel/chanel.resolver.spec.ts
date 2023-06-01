import { Test, TestingModule } from '@nestjs/testing';
import { ChanelResolver } from './chanel.resolver';
import { ChanelService } from './chanel.service';

describe('ChanelResolver', () => {
  let resolver: ChanelResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChanelResolver, ChanelService],
    }).compile();

    resolver = module.get<ChanelResolver>(ChanelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
