import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigs } from './config/dbConfig';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/auth/jwt-auth.guard';
import { MailerModule } from './app/mailer/mailer.module';
import { MailTemplateModule } from './app/mail-template/mail-template.module';
import { BulkMailModule } from './app/bulk-mail/bulk-mail.module';
import { multerConfig } from './config/multer.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfigs()),
    MulterModule.register(multerConfig),
    AuthModule,
    UserModule,
    MailerModule,
    MailTemplateModule,
    BulkMailModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
