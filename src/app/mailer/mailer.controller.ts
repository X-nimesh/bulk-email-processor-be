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
    console.log('Received data from que userId:', data.userId);
    await this.mailerService.sendBulkMail(data);
  }
}
