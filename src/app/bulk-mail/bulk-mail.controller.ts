import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorator';
import { BulkMailReqDTO } from './bulk-mail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BulkMailService } from './bulk-mail.service';

@ApiTags('Bulk Mail')
@Controller('bulk-mail')
export class BulkMailController {
  constructor(private readonly bulkMailService: BulkMailService) {}

  @Public()
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async sendBulkMail(
    @Body() data: BulkMailReqDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { title, templateId } = data;
    const emailList = this.bulkMailService.readExcelFile(file.buffer);
    await this.bulkMailService.sendBulkMail({ emailList, title, templateId });
    return { message: 'This action returns all bulk-mail' };
  }
}
