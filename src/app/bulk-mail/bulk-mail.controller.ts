import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorator';
import { BulkMailReqDTO } from './bulk-mail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BulkMailService } from './bulk-mail.service';

@ApiTags('Bulk Mail')
@ApiBearerAuth()
@Controller('bulk-mail')
export class BulkMailController {
  constructor(private readonly bulkMailService: BulkMailService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async sendBulkMail(
    @Body() data: BulkMailReqDTO,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    console.log(req.user);
    const { name, userId } = req.user;
    const { templateId } = data;
    const emailList = this.bulkMailService.readExcelFile(file.buffer);
    const headers = Object.keys(emailList[0])[0] === 'email';
    if (!headers) {
      return { message: 'Invalid file format' };
    }
    await this.bulkMailService.sendBulkMail({
      emailList,
      templateId,
      name,
      userId,
    });
    return { message: 'This action returns all bulk-mail' };
  }
}
