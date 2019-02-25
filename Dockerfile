FROM node:10-alpine

MAINTAINER MrWakeCZ

COPY /dist /api
COPY /node_modules /api/node_modules

WORKDIR /api

EXPOSE 80 3000

ENTRYPOINT ["node", "server.js"]
