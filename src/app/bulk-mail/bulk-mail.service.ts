import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { bulkMailDTO } from './bulk-mail.dto';
import * as XLSX from 'xlsx';

import { MailTemplateService } from '../mail-template/mail-template.service';

@Injectable()
export class BulkMailService {
  private client: ClientProxy;
  constructor(private readonly mailTemplateservice: MailTemplateService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'main_queue', // Replace with your RabbitMQ queue name
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async sendBulkMail(data: bulkMailDTO) {
    const { emailList, title, templateId } = data;
    const templateDetails =
      await this.mailTemplateservice.getMailTemplateById(templateId);
    if (!templateDetails) {
      throw new Error('Template not found');
    }
    const { subject, html } = templateDetails;
    for (const email of emailList) {
      await this.sendBulkMailToQue({
        to: email,
        subject,
        text: title,
        html,
      });
    }
  }
  readExcelFile(fileBuffer: any): string[] {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
  }
  async sendBulkMailToQue(data: any) {
    return this.client.send('send_bulk_mail', data).toPromise();
  }
}
