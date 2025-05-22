# web/frontend/Dockerfile
# Этап сборки
FROM node:18-alpine AS build

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json (если есть)
COPY package*.json ./

# Установка зависимостей
RUN npm install
RUN npm audit --audit-level=moderate || true  # Проверка уязвимостей

# Копирование всего проекта
COPY . .

# Сборка приложения с Vite
RUN npm run build

# Этап сервера
FROM nginx:alpine

# Копирование файлов сборки из предыдущего этапа
COPY --from=build /app/dist /usr/share/nginx/html

# Копирование конфигурации и сертификатов Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/ssl/ /etc/nginx/ssl/

# Открытие порта
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]