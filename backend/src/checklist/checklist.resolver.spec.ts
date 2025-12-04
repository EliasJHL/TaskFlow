import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistResolver } from './checklist.resolver';

describe('ChecklistResolver', () => {
  let resolver: ChecklistResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChecklistResolver],
    }).compile();

    resolver = module.get<ChecklistResolver>(ChecklistResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
