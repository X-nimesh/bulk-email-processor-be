import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from '../base.entity';
import { User } from '../user/user.entity';

export enum MailStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}
@Entity('mail_log')
export class MailLog extends Base {
  @PrimaryGeneratedColumn()
  mailLogId: number;

  @Column()
  to: string;

  @Column()
  subject: string;

  @Column({ type: 'text' })
  html: string;

  @Column({ type: 'enum', enum: MailStatus, default: MailStatus.PENDING })
  status: MailStatus;
  @ManyToOne(() => User, (user) => user.mailLogs)
  @JoinColumn({ name: 'sender_id' })
  user: User;
}
