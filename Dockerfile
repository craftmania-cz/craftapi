FROM node:14-slim

COPY / /api
WORKDIR /api

RUN npm install --ignore-scripts
RUN npm run build

EXPOSE 80 3000

ENTRYPOINT ["node", "dist/server.js"]
