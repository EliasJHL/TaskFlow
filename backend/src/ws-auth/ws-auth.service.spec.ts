import { Test, TestingModule } from '@nestjs/testing';
import { WsAuthService } from './ws-auth.service';

describe('WsAuthService', () => {
  let service: WsAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsAuthService],
    }).compile();

    service = module.get<WsAuthService>(WsAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
