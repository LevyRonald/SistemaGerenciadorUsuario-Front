FROM node:16-alpine

USER root

WORKDIR /user/app-front/app

COPY . .

EXPOSE 8080