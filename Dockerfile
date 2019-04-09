FROM node:10-alpine

COPY / /api

WORKDIR /api

RUN npm install --ignore-scripts

RUN npm run build-ci

EXPOSE 80 3000

ENTRYPOINT ["node", "dist/server.js"]
