/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** app.module
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { join } from 'path';
import { WorkspaceModule } from './workspace/workspace.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { BoardModule } from './board/board.module';
import { ListModule } from './list/list.module';
import { CardModule } from './card/card.module';
import { LabelModule } from './label/label.module';
import { ChecklistModule } from './checklist/checklist.module';
import { WsAuthService } from './ws-auth/ws-auth.service';
import { WsAuthModule } from './ws-auth/ws-auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        GraphQLModule.forRootAsync<MercuriusDriverConfig>({
            driver: MercuriusDriver,
            imports: [WsAuthModule],
            inject: [WsAuthService],
            useFactory: async (wsAuth: WsAuthService): Promise<MercuriusDriverConfig> => ({
                typePaths: [join(process.cwd(), 'src/graphql/schemas/**/*.graphql')],
                graphiql: true,
                context: (request, reply) => ({ req: request, reply }),
                definitions: {
                    path: join(process.cwd(), 'src/graphql/graphql.ts'),
                    outputAs: 'class',
                },
                subscription: {
                    // context: async (_: any, req: any) => {
                    //     const auth = req.headers?.authorization ?? req.headers?.Authorization;
                    //     if (!auth?.startsWith('Bearer ')) throw new Error('UNAUTHORIZED');

                    //     const token = auth.slice(7);
                    //     const payload = jwt.verify(token);

                    //     return { userId: payload.sub, sessionUUID: randomUUID() };
                    // },
                },
            }),
        }),
        AuthModule,
        CommonModule,
        PrismaModule,
        WorkspaceModule,
        BoardModule,
        ListModule,
        CardModule,
        LabelModule,
        ChecklistModule,
        WsAuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
