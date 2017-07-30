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

ARG GEMFURY

RUN npm i --registry $GEMFURY -q
ENTRYPOINT npm start
