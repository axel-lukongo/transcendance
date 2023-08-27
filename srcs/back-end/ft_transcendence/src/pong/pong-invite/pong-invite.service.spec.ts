import { Test, TestingModule } from '@nestjs/testing';
import { PongInviteService } from './pong-invite.service';

describe('PongInviteService', () => {
  let service: PongInviteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PongInviteService],
    }).compile();

    service = module.get<PongInviteService>(PongInviteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
