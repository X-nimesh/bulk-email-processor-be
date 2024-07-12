export class SendMailDTO {
  email: string;
  subject: string;
  body: string;
}
export class BulkMailDTO {
  to: string;
  subject: string;
  title: string;
  html: string;
  name: string;
  userId: number;
}
