import { Test, TestingModule } from '@nestjs/testing';
import { BoardEventPayloadResolver } from './board-event-payload.resolver';

describe('BoardEventPayloadResolver', () => {
  let resolver: BoardEventPayloadResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardEventPayloadResolver],
    }).compile();

    resolver = module.get<BoardEventPayloadResolver>(BoardEventPayloadResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
