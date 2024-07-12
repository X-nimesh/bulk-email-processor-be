import { Injectable } from '@nestjs/common';
import { LoginUserDTO, RegisterUserDTO } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../mailer/mailer.service';
import { env } from 'src/config/env';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}
  async register(userDetails: RegisterUserDTO) {
    const { email, password } = userDetails;
    const userExists = await this.userService.findOnebyEmail(email);
    if (userExists) {
      return { message: 'User already exists' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser({
      ...userDetails,
      password: hashedPassword,
    });
    // sending verification mail
    return await this.sendVerificationMail(user.email, user.id, user.name);
  }
  async login(userDeatils: LoginUserDTO) {
    const { password, email } = userDeatils;
    const user = await this.userService.findOnebyEmail(email);
    if (
      user &&
      user.verified &&
      (await bcrypt.compare(password, user.password))
    ) {
      const payload = { sub: user.id, name: user.name, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return { message: 'Invalid email or password' };
  }

  async sendVerificationMail(email: string, id: number, name: string) {
    const payload = { sub: id };
    const token = await this.jwtService.signAsync(payload);

    const mailOption = {
      email: email,
      subject: 'Verify your email',
      body: `<p>Hello ${name}, please verify your email by clicking on the link below</p>
        <a href='${env.FRONTURL}/auth/verify?token=${token}'>Verify Email</a>`,
    };
    await this.mailerService.sendMail(mailOption);
    return { message: 'Verification mail sent' };
  }

  async verifyEmail(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    const { sub } = payload;
    const user = await this.userService.findOneUsersByID(sub);
    if (user) {
      user.verified = true;
      await this.userService.updateUser(sub, user);
      return { message: 'Email verified' };
    }
    return { message: 'Invalid token' };
  }
}
