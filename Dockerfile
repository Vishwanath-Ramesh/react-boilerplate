FROM node:alpine as builder

WORKDIR /usr/app

COPY ./package.json ./

RUN yarn install

COPY ./ ./

RUN yarn build
RUN mkdir test2
RUN ls