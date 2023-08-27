import { Test, TestingModule } from '@nestjs/testing';
import { PongInviteResolver } from './pong-invite.resolver';
import { PongInviteService } from './pong-invite.service';

describe('PongInviteResolver', () => {
  let resolver: PongInviteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PongInviteResolver, PongInviteService],
    }).compile();

    resolver = module.get<PongInviteResolver>(PongInviteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
