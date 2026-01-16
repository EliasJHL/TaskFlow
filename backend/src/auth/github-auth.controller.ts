/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** github-auth.controller
 */

import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FastifyReply } from 'fastify';
import { randomUUID } from 'crypto';
import { AuthService } from './auth.service';

type GithubUser = {
    id: number;
    login: string;
    email: string | null;
    avatar_url?: string | null;
};

type GithubEmail = {
    email: string;
    primary: boolean;
    verified: boolean;
};

@Controller('auth')
export class GithubAuthController {
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
    ) {}

    @Get('github')
    async githubRedirect(@Res() reply: FastifyReply) {
        const clientId = this.configService.get<string>('GITHUB_CLIENT_ID');
        const callbackUrl = this.configService.get<string>(
            'GITHUB_CALLBACK_URL',
        );

        if (!clientId || !callbackUrl) {
            return reply.status(500).send('Missing GitHub OAuth config');
        }

        const state = randomUUID();
        reply.setCookie('github_oauth_state', state, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 300,
        });

        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: callbackUrl,
            state,
            scope: 'read:user user:email',
        });

        return reply.redirect(
            `https://github.com/login/oauth/authorize?${params.toString()}`,
        );
    }

    @Get('github/callback')
    async githubCallback(
        @Query('code') code: string,
        @Query('state') state: string,
        @Req() req: any,
        @Res() reply: FastifyReply,
    ) {
        const clientId = this.configService.get<string>('GITHUB_CLIENT_ID');
        const clientSecret = this.configService.get<string>(
            'GITHUB_CLIENT_SECRET',
        );
        const callbackUrl = this.configService.get<string>(
            'GITHUB_CALLBACK_URL',
        );
        const frontendUrl =
            this.configService.get<string>('FRONTEND_URL') ??
            'http://localhost:5173';

        if (!clientId || !clientSecret || !callbackUrl) {
            return reply.status(500).send('Missing GitHub OAuth config');
        }

        const storedState = req.cookies?.github_oauth_state;
        if (!storedState || storedState !== state) {
            return reply.redirect(`${frontendUrl}/login?error=oauth_state`);
        }

        try {
            const tokenRes = await fetch(
                'https://github.com/login/oauth/access_token',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        client_id: clientId,
                        client_secret: clientSecret,
                        code,
                        redirect_uri: callbackUrl,
                    }),
                },
            );
            const tokenData = await tokenRes.json();
            const accessToken = tokenData?.access_token;

            if (!accessToken) {
                return reply.redirect(`${frontendUrl}/login?error=oauth_token`);
            }

            const userRes = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/vnd.github+json',
                },
            });
            const githubUser = (await userRes.json()) as GithubUser;

            const emailsRes = await fetch(
                'https://api.github.com/user/emails',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        Accept: 'application/vnd.github+json',
                    },
                },
            );
            const emails = (await emailsRes.json()) as GithubEmail[];

            const primaryEmail =
                emails?.find((e) => e.primary && e.verified)?.email ??
                emails?.find((e) => e.verified)?.email ??
                githubUser.email;

            if (!primaryEmail || !githubUser?.login || !githubUser?.id) {
                return reply.redirect(`${frontendUrl}/login?error=oauth_user`);
            }

            const { token } = await this.authService.loginWithGithub({
                githubId: String(githubUser.id),
                email: primaryEmail,
                username: githubUser.login,
                avatarUrl: githubUser.avatar_url ?? null,
            });

            reply.clearCookie('github_oauth_state', { path: '/' });
            reply.setCookie('session', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            });

            return reply.redirect(`${frontendUrl}/app`);
        } catch {
            return reply.redirect(`${frontendUrl}/login?error=oauth_failed`);
        }
    }
}
