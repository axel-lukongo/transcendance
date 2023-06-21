import { Test, TestingModule } from '@nestjs/testing';
import { UserChanelsResolver } from './user-chanels.resolver';

describe('UserChanelsResolver', () => {
  let resolver: UserChanelsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserChanelsResolver],
    }).compile();

    resolver = module.get<UserChanelsResolver>(UserChanelsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
