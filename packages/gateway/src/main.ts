import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = '/api';

  app.enableCors();
  app.use(helmet());

  app.setGlobalPrefix(globalPrefix);

  /**
   * TODO: Need to fix Swagger
   */
  // const swaggerOptions = new DocumentBuilder()
  //   .setTitle('API docs')
  //   .addTag('users')
  //   .addTag('tasks')
  //   .setVersion('1.0')
  //   .build();

  // const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  // SwaggerModule.setup(`${globalPrefix}/swagger`, app, swaggerDoc);

  await app.listen(8000);
}
bootstrap();
