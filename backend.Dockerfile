FROM node:8-alpine

WORKDIR /var/app

COPY . /var/app

RUN npm install && npm i -g pm2

EXPOSE 4444

ENV HOST=dbmongo

CMD ["pm2", "start", "--no-daemon", "src/server/index.js"]
