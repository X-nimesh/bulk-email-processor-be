import { MailerService } from './../mailer/mailer.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/config/env';
import { PassportModule } from '@nestjs/passport';
import { JwtStartegy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { MailLog } from '../mailer/mail-log.entity';

@Module({
  imports: [
    PassportModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: env.JWTSECRET,
      signOptions: { expiresIn: '5d' },
    }),
    TypeOrmModule.forFeature([User, MailLog]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStartegy, UserService, MailerService],
})
export class AuthModule {}
