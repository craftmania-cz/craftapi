FROM node:10

COPY / /api

WORKDIR /api

RUN npm install

RUN npm run build-ci

EXPOSE 80 3000

ENTRYPOINT ["node", "dist/server.js"]
