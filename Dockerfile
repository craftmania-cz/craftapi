FROM node:14

COPY / /api
WORKDIR /api

RUN npm install --ignore-scripts
RUN npm run build

EXPOSE 80 3000

ENTRYPOINT ["node", "dist/server.js"]
