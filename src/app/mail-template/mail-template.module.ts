import { Module } from '@nestjs/common';
import { MailTemplateController } from './mail-template.controller';
import { MailTemplateService } from './mail-template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailTemplate } from './mail-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MailTemplate])],
  controllers: [MailTemplateController],
  providers: [MailTemplateService],
  exports: [MailTemplateService],
})
export class MailTemplateModule {}
