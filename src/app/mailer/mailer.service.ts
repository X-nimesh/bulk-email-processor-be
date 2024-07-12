import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { env } from 'src/config/env';
import { BulkMailDTO, SendMailDTO } from './mailer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MailLog, MailStatus } from './mail-log.entity';
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
      from: 'mail@nimesh11.com.np',
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
  async sendBulkMail(data: BulkMailDTO) {
    const { to, subject, html, name, userId } = data;
    const mailLog = await this.mailLogRepository.save({
      to,
      subject,
      html,
      user: { id: userId },
      status: MailStatus.PENDING,
    });
    try {
      // log
      let emailTemplate = html;
      emailTemplate = emailTemplate.replace('[name]', name);
      await this.sendMail({ email: to, subject, body: emailTemplate });
      await this.mailLogRepository.update(
        { mailLogId: mailLog.mailLogId },
        { status: MailStatus.SENT },
      );
      return { message: 'This action returns all mailer' };
    } catch (error) {
      await this.mailLogRepository.update(
        { mailLogId: mailLog.mailLogId },
        { status: MailStatus.FAILED },
      );
      return { message: 'Failed to send email' };
    }
  }
}
