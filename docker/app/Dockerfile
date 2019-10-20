FROM node:latest

RUN mkdir -p /app/quickstart
COPY ./quickstart/package.json /app/quickstart
WORKDIR /app/quickstart
RUN npm i

EXPOSE 8080
