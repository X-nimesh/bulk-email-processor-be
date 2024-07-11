import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailTemplate } from './mail-template.entity';
import { Repository } from 'typeorm';
import { MailTemplateDto } from './mail-template.dto';

@Injectable()
export class MailTemplateService {
  constructor(
    @InjectRepository(MailTemplate)
    private mailTemplateRepository: Repository<MailTemplate>,
  ) {}
  async getAllMailTemplate() {
    return await this.mailTemplateRepository.find();
  }
  async createMailTemplate(body: MailTemplateDto) {
    return await this.mailTemplateRepository.save(body);
  }
  async getMailTemplateById(mailTemplateId: number) {
    return await this.mailTemplateRepository.findOne({
      where: { mailTemplateId },
    });
  }
}
