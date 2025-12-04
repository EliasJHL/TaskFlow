/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** checklist.resolver
*/

import {
    Resolver,
    Mutation,
    Args,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { ChecklistService } from './checklist.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChecklistInput } from '../graphql/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Resolver()
export class ChecklistResolver {
    constructor(
        private checklistService: ChecklistService,
        private prisma: PrismaService,
    ) {}

    @Mutation('createChecklist')
    @UseGuards(AuthGuard)
    async createChecklist(
        @Args('input') input: CreateChecklistInput,
    ) {
        return this.checklistService.create(input);
    }

    @Mutation('deleteChecklist')
    @UseGuards(AuthGuard)
    async deleteChecklist(@Args('checklist_id') checklistId: string) {
        return this.checklistService.delete(checklistId);
    }
}
