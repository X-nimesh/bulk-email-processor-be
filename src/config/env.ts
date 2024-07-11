import { config } from 'dotenv';

config();

export const env = {
  PORT: process.env.PORT || 3000,
  JWTSECRET: process.env.JWTSECRET || 'SecretKeyNIM87687@#$',
  MAILERHOST: process.env.MAILER_HOST,
  MAILERPORT: process.env.MAILER_PORT,
  MAILERUSER: process.env.MAILER_USER,
  MAILERPASS: process.env.PASSWORD,
  FRONTURL: process.env.FRONTURL,
};
