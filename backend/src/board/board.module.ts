import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { BoardEventPayloadResolver } from './board-event-payload.resolver';

@Module({
    providers: [BoardResolver, BoardEventPayloadResolver, BoardService],
    exports: [BoardService],
})
export class BoardModule {}
