FROM node:21-alpine3.18 as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .