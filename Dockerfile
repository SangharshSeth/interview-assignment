FROM node:alpine as development

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 3002

CMD [ "pnpm", "run", "start:dev" ]
