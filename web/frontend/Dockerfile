FROM node:18 AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
# Install openssl for certificate generation
RUN apk add --no-cache openssl
# Create directory for certificates
RUN mkdir -p /etc/nginx/certs
# Generate self-signed SSL certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/certs/nginx.key \
    -out /etc/nginx/certs/nginx.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=localhost"
# Copy built React app
COPY --from=build /app/build /usr/share/nginx/html
# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose ports for HTTP and HTTPS
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]