import { config } from 'dotenv';

config();

export const env = {
  PORT: process.env.PORT || 3000,
  JWTSECRET: process.env.JWTSECRET || 'SecretKeyNIM87687@#$',
};
