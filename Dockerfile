FROM node:12.8.0-alpine

RUN mkdir front
WORKDIR /front

COPY /api ./api
COPY ./src ./src
COPY package.json .
COPY package-lock.json .
COPY .babelrc .
COPY webpack.config.js .
RUN npm install --only=prod

RUN apk add git
RUN apk add bash

RUN mkdir repos
WORKDIR /front/repos
RUN git clone --bare https://github.com/SemenovaEkaterina/yndx-shri-hw-redux
RUN git clone --bare https://github.com/SemenovaEkaterina/promise-polyfill
RUN ls
WORKDIR /front
RUN ls

EXPOSE 8080

CMD npx concurrently --kill-others "npm run api-prod /front/repos" "npm run start"