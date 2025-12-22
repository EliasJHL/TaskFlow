/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** board-event-payload.resolver
*/

import { Resolver, ResolveField } from '@nestjs/graphql';

@Resolver('BoardEventPayload')
export class BoardEventPayloadResolver {
  @ResolveField()
  __resolveType(value: any) {
    return value.__typename;
  }
}
