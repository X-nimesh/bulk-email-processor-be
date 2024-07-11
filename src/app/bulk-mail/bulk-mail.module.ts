import { Module } from '@nestjs/common';
import { BulkMailController } from './bulk-mail.controller';
import { BulkMailService } from './bulk-mail.service';
import { MailTemplateService } from '../mail-template/mail-template.service';
import { Type } from 'class-transformer';
import { MailTemplate } from '../mail-template/mail-template.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MailTemplate])],
  controllers: [BulkMailController],
  providers: [BulkMailService, MailTemplateService],
})
export class BulkMailModule {}
