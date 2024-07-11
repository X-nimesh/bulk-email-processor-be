import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailerService } from './mailer.service';
import { EventPattern } from '@nestjs/microservices';

@ApiTags('Mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('send_bulk_mail')
  async sendBulkMail(data: any) {
    const { to, subject, text, html } = data;
    console.log({ data });
    return this.mailerService.sendBulkMail(to, subject, text, html);
  }
}
