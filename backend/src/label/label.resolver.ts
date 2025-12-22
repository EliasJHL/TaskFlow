/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** label.resolver
 */

import {
    Resolver,
    Mutation,
    Args,
    Subscription,
    Context,
} from '@nestjs/graphql';
import { LabelService } from './label.service';
import { CreateLabelInput } from '../graphql/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Resolver('Label')
export class LabelResolver {
    constructor(private labelService: LabelService) {}

    @Mutation('createLabel')
    @UseGuards(AuthGuard)
    async createLabel(
        @Args('input') input: CreateLabelInput,
        @Context() ctx: any,
        @Context('pubsub') pubsub: any,
    ) {
        const label = await this.labelService.create(input);

        const actorUserId = ctx.req?.user?.user_id ?? ctx.userId;
        const boardId = (input as any).board_id;

        if (!label || '__typename' in label || !label.board_id) {
            throw new Error('LABEL_INVALID');
        }

        try {
            await pubsub.publish({
                topic: 'BOARD_EVENT',
                payload: {
                    boardEvent: {
                        __typename: 'LabelCreatedEvent',
                        board_id: boardId,
                        actor_user_id: actorUserId,
                        label,
                    },
                },
            });
        } catch (e) {
            console.error('[PUBSUB] publish failed', e);
        }
        return label;
    }

    @Mutation('deleteLabel')
    @UseGuards(AuthGuard)
    async deleteLabel(
        @Args('label_id') id: string,
        @Context() ctx: any,
        @Context('pubsub') pubsub: any,
    ) {
        const res = await this.labelService.delete(id);

        const label = await this.labelService.findOne(id);
        const actorUserId = ctx.req?.user?.user_id ?? ctx.userId;
    
        if (res.__typename === 'Error') return res;
        
        try {
            await pubsub.publish({
                topic: 'BOARD_EVENT',
                payload: {
                    boardEvent: {
                        __typename: 'LabelDeletedEvent',
                        board_id: label?.board_id,
                        actor_user_id: actorUserId,
                        label_id: id,
                    },
                },
            });
        } catch (e) {
            console.error('[PUBSUB] publish failed', e);
        }
        return res;
    }
}
