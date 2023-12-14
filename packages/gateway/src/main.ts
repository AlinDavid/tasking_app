import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = '/api';

  app.enableCors();
  app.use(helmet());

  app.setGlobalPrefix(globalPrefix);

  await app.listen(8000);
}
bootstrap();
