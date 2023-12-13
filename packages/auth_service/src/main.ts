import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 8002,
    },
  } as TcpOptions);

  await app.listen();
}
bootstrap();
