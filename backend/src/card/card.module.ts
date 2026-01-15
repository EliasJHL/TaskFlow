import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardResolver } from './card.resolver';
import { ListModule } from 'src/list/list.module';

@Module({
    imports: [ListModule],
    providers: [CardService, CardResolver],
})
export class CardModule {}
