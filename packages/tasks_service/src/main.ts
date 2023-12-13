import { NestFactory } from '@nestjs/core';
import { TaskModule } from './tasks.module';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TaskModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 8003,
    },
  } as TcpOptions);

  await app.listen();
}
bootstrap();
