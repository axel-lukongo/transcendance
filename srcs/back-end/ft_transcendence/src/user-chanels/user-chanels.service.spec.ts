import { Test, TestingModule } from '@nestjs/testing';
import { UserChanelsService } from './user-chanels.service';

describe('UserChanelsService', () => {
  let service: UserChanelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserChanelsService],
    }).compile();

    service = module.get<UserChanelsService>(UserChanelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
