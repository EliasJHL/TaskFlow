/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** label.resolver
*/

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LabelService } from './label.service';
import { CreateLabelInput } from '../graphql/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Resolver('Label')
export class LabelResolver {
    constructor(private labelService: LabelService) {}

    @Mutation('createLabel')
    @UseGuards(AuthGuard)
    async createLabel(@Args('input') input: CreateLabelInput) {
        return this.labelService.create(input);
    }

    @Mutation('deleteLabel')
    @UseGuards(AuthGuard)
    async deleteLabel(@Args('label_id') id: string) {
        return this.labelService.delete(id);
    }
}
