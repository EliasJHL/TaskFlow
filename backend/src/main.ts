import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import cookie from '@fastify/cookie';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );
    await app.register(cookie);
    app.enableCors({
        origin: ['https://taskflow.eliasjhl-projects.fr', 'http://localhost:3000', 'http://localhost:5173'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    const port = Number(process.env.PORT) || 3000;
    await app.listen(port, '0.0.0.0');
}
bootstrap();
