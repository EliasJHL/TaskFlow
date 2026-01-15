/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** ws-auth.module
*/

import { Module } from '@nestjs/common';
import { WsAuthService } from './ws-auth.service';

@Module({
  providers: [WsAuthService],
  exports: [WsAuthService],
})
export class WsAuthModule {}
