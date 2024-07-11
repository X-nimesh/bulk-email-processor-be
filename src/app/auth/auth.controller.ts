import { Body, Controller, Post } from '@nestjs/common';
import {
  LoginUserDTO,
  RegisterUserDTO,
  VerifyEmailDTO,
} from '../user/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() body: RegisterUserDTO) {
    return this.authService.register(body);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginUserDTO) {
    return this.authService.login(body);
  }
  @Public()
  @Post('verify')
  async verifyEmail(@Body() body: VerifyEmailDTO) {
    return this.authService.verifyEmail(body.token);
  }
}
