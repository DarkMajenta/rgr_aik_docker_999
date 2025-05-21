FROM node:18

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN ls -la public/index.html || (echo "Error: public/index.html not found" && exit 1)

# Проверка синтаксиса с поддержкой ES Modules
RUN node --input-type=module -e "import('./src/index.js')" || (echo "Syntax error in src/index.js" && exit 1)

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "preview", "--", "--port", "80", "--host"]