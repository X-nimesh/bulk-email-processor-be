import { DataSource } from 'typeorm';
import { MailTemplate } from '../mail-template/mail-template.entity';
import { MAIL_TEMPLATE } from './maile-template-data';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
export async function seedData(dataSource: DataSource) {
  const repository = dataSource.getRepository(MailTemplate);
  for (const data of MAIL_TEMPLATE) {
    const template = new MailTemplate();
    template.title = data.mailTemplateTitle;
    template.subject = data.mailTemplateSubject;
    template.html = data.mailTemplateBody;
    await repository.save(template);
  }

  await dataSource.destroy();
}
async function runSeeder() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  await seedData(dataSource);
  await app.close();
}
runSeeder().catch((error) => {
  console.error('Error running the seeder:', error);
});
