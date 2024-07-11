import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from './config/env';
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
    .setVersion('1.0')
    .addTag('bulk-email-processor')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT);
}
bootstrap().then(() =>
  console.info(`************ STARTED on PORT: ${PORT} *************`),
);
