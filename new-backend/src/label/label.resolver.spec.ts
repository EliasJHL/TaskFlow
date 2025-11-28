import { Test, TestingModule } from '@nestjs/testing';
import { LabelResolver } from './label.resolver';
import { AuthGuard } from '../common/guards/auth.guard';
import { LabelService } from './label.service';

describe('LabelResolver', () => {
    let resolver: LabelResolver;
    const mockLabelService = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LabelResolver,
                { provide: LabelService, useValue: mockLabelService },
            ],
        })
            .overrideGuard(AuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        resolver = module.get<LabelResolver>(LabelResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
