import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from './config/env';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
const PORT = env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //   this is for enabling cors
  app.enableCors({
    origin: '*',
  });
  //   this is for validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  //   this is for swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Bulk Email Processor API')
    .setDescription('The Bulk Email Processor API description')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('bulk-email-processor')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //   microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'main_queue', // Replace with your queue name
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(PORT);
}
bootstrap().then(() =>
  console.info(`************ STARTED on PORT: ${PORT} *************`),
);
