import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../base.entity';

@Entity()
export class MailTemplate extends Base {
  @PrimaryGeneratedColumn()
  mailTemplateId: number;
  @Column()
  title: string;

  @Column()
  subject: string;

  @Column({ type: 'text' })
  html: string;
}
