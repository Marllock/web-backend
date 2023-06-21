import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/cert/private.key'),
    cert: fs.readFileSync('/cert/certificate.crt'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions});
  app.useGlobalPipes(
    new ValidationPipe({ enableDebugMessages: true, errorHttpStatusCode: 400 }),
  );
  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .setTitle('Animes API')
    .setDescription('The Anime API documentation')
    .setVersion('1.0')
    .addServer('https://localhost:8080')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  dotenv.config();
  await app.listen(8080);
}
bootstrap();
