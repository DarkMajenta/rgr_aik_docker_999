# web/backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Копирование всех файлов, включая src/ как часть пакета
COPY . .

# Установка зависимостей
RUN pip install --no-cache-dir -r requirements.txt

# Запуск uvicorn с указанием полного пути к модулю
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "3000"]