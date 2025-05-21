# web/frontend/Dockerfile
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
EXPOSE 80

RUN npm run build
CMD npm start & tail -f /dev/null