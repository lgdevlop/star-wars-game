FROM node:8-alpine

WORKDIR /var/app

COPY . /var/app

RUN npm install && npm i -g pm2 && npm run build && rm -rf src/client/ && rm -rf config/

EXPOSE 8080

ENV PORT=8080

CMD ["pm2", "start", "--no-daemon", "src/server/index.js"]
