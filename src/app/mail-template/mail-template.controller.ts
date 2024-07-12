import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MailTemplateService } from './mail-template.service';
import { MailTemplateDto } from './mail-template.dto';

@ApiTags('Mail Template')
@ApiBearerAuth()
@Controller('mail-template')
export class MailTemplateController {
  constructor(private readonly mailTemplateService: MailTemplateService) {}
  @Get()
  async getMailTemplate() {
    return this.mailTemplateService.getAllMailTemplate();
  }
  @Get(':id')
  async getMailTemplateById(id: number) {
    return this.mailTemplateService.getMailTemplateById(id);
  }
  @Post()
  async createMailTemplate(@Body() body: MailTemplateDto) {
    return await this.mailTemplateService.createMailTemplate(body);
  }
}
