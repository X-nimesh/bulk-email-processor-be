import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { env } from 'src/config/env';
import { SendMailDTO } from './mailer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MailLog } from './mail-log.entity';
import { Repository } from 'typeorm';
@Injectable()
export class MailerService {
  constructor(
    @InjectRepository(MailLog)
    private mailLogRepository: Repository<MailLog>,
  ) {}

  async sendMail(data: SendMailDTO) {
    const transporter = nodemailer.createTransport({
      host: env.MAILERHOST,
      port: env.MAILERPORT,
      auth: {
        user: env.MAILERUSER,
        pass: env.MAILERPASS,
      },
    });
    const mailOptions = {
      from: 'nimesh@demomailtrap.com',
      to: data.email,
      subject: data.subject,
      html: data.body,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return { message: 'Email sent' };
  }
  async sendBulkMail(to: string, subject: string, text: string, html: string) {
    console.log('Sending bulk mail Service');
    return { message: 'This action returns all mailer' };
  }
}
