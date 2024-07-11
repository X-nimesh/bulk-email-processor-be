import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './app/auth/decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
