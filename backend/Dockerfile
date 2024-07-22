FROM node:18-alpine

WORKDIR /app

COPY package.json ./

COPY yarn.lock .

COPY . .

RUN yarn

EXPOSE 3000

CMD node ./build/index.js
