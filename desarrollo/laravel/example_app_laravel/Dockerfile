FROM php:8.4-fpm

# Argumentos de build
ARG WWWGROUP=1000
ARG NODE_VERSION=20

WORKDIR /var/www/html

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalar extensiones de PHP
RUN docker-php-ext-install pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar Node.js y NPM
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Configurar usuario no-root
RUN groupadd --force -g $WWWGROUP laravel \
    && useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 laravel

# Copiar archivos de la aplicación
COPY --chown=laravel:laravel . .

# Cambiar permisos
RUN chown -R laravel:laravel /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

USER laravel

EXPOSE 8000
EXPOSE 5173

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
