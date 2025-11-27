/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** app.module
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { WorkspaceResolver } from './workspace/workspace.resolver';
import { WorkspaceService } from './workspace/workspace.service';
import { join } from 'path';
import { AuthGuard } from './common/guards/auth.guard';
import { WorkspaceModule } from './workspace/workspace.module';
import { JwtModule } from '@nestjs/jwt';
import { WorkspaceGuard } from './common/guards/workspace.guard';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';

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
        }),
        AuthModule,
        CommonModule,
        PrismaModule,
        WorkspaceModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
