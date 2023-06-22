import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      queue: 'create_anime_queue',
      urls: ['amqp://marcello:123@localhost:5672'],
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();

  await app.listen(8081);
}
bootstrap();
