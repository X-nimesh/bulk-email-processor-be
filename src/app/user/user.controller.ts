import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('mail-log')
  async sendMail(@Req() req: any) {
    const { userId } = req.user;
    return this.userService.getMailLogs(userId);
  }
}
