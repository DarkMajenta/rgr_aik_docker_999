FROM node:18

WORKDIR /app

# Копируем зависимости
COPY package.json .
RUN npm install

# Копируем весь проект
COPY . .

# Проверяем наличие index.html
RUN ls -la public/index.html || (echo "Error: public/index.html not found" && exit 1)

# Выполняем сборку
RUN npm run build

EXPOSE 80

CMD ["npm", "run", "preview", "--", "--port", "80", "--host"]