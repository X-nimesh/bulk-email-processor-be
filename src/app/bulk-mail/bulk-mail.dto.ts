import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

interface emailListType {
  email: string;
}
export class bulkMailDTO {
  emailList: emailListType[];
  templateId: number;
  name: string;
  userId: number;
}
export class BulkMailReqDTO {
  @ApiProperty()
  @IsNotEmpty()
  templateId: number;

  @ApiProperty({
    type: 'file',
  })
  file: any;
}
