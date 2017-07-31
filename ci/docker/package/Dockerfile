FROM node:8.1.4
WORKDIR /workdir

COPY ./package.json .
COPY ./Procfile.json .
COPY ./server.js .
COPY ./img ./img
COPY ./model ./model
COPY ./public ./public
COPY ./server ./server
COPY ./src ./src
COPY ./config_prod.js ./config.js

ARG GEMFURY
EXPOSE 3000 3001

RUN npm i --registry $GEMFURY -q
ENTRYPOINT npm start
