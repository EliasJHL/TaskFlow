/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** ws-auth.service
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as cookie from 'cookie';
import { randomUUID } from 'crypto';

@Injectable()
export class WsAuthService {
    constructor(private readonly jwt: JwtService) {}

    validateConnectionParams(ctx: any) {
        const sessionUUID = randomUUID();

        console.log('[WS] cookie header:', ctx?.request?.headers?.cookie);

        const cookieHeader = ctx?.request?.headers?.cookie as string | undefined;
        const cookies = cookieHeader ? cookie.parse(cookieHeader) : {};
        const token = cookies.session;

        if (!token) throw new UnauthorizedException('Missing token');

        let payload: any;

        try {
            payload = this.jwt.verify(token);
        } catch {
            console.log(`[WS] rejected - session ${sessionUUID}`);
            throw new Error('UNAUTHORIZED');
        }

        console.log(
            `[WS] accepted - session ${sessionUUID} user ${payload.sub}`,
        );
        return { userId: payload.sub, sessionUUID };
    }
}
