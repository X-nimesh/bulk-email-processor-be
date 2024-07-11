import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailLog } from './mail-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MailLog])],
  providers: [MailerService],
  exports: [MailerService],
  controllers: [MailerController],
})
export class MailerModule {}
