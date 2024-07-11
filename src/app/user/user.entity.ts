import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../base.entity';
import { MailLog } from '../mailer/mail-log.entity';

@Entity('users')
export class User extends Base {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password', length: 200 })
  password: string;

  @Column({ name: 'verified', default: false })
  verified: boolean;

  @OneToMany(() => MailLog, (mailLog) => mailLog.user)
  mailLogs: MailLog[];
}
