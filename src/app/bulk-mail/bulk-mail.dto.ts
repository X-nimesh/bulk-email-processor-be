import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class bulkMailDTO {
  emailList: string[];
  title: string;
  templateId: number;
}
export class BulkMailReqDTO {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  templateId: number;

  @ApiProperty({
    type: 'file',
  })
  file: any;
}
