FROM node:10

MAINTAINER MrWakeCZ

RUN mkdir -p /api

COPY / /api

WORKDIR /api

RUN npm i npm@latest -g \
    && yarn add fs-extra \
    && yarn

RUN yarn run build-ci

RUN ls -a

COPY dist /runnable

COPY node_modules /runnable/node_modules

COPY swagger.json /runnable

WORKDIR /runnable

RUN chmod -R 777 swagger.json

EXPOSE 80 3001

ENTRYPOINT ["node", "server.js"]
