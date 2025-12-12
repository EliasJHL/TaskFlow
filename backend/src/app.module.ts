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
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { GraphQLModule } from '@nestjs/graphql';
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

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, 
        }),
        GraphQLModule.forRoot<MercuriusDriverConfig>({
            driver: MercuriusDriver,
            typePaths: [join(process.cwd(), 'src/graphql/schemas/*.graphql')],
            graphiql: true,
            context: (request, reply) => ({ req: request, reply }),
            definitions: {
                path: join(process.cwd(), 'src/graphql/graphql.ts'),
                outputAs: 'class',
            },
            subscription: true
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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
