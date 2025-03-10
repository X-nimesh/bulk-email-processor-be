# Base image
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm i

COPY . .

RUN pnpm build

CMD ["sh", "-c", "pnpm seeder && pnpm start:prod"]
