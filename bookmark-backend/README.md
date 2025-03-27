# Bookmark App Backend

Бэкенд-часть приложения для управления закладками, построенная на Ruby on Rails с использованием GraphQL API.

## Технологии

- Ruby 3.3.6
- Ruby on Rails 7.1.5
- PostgreSQL
- GraphQL (graphql-ruby)
- Docker и Docker Compose

## Требования

### Для Docker
- Docker
- Docker Compose

### Для локального запуска
- Ruby 3.3.6
- PostgreSQL 14+
- Bundler

## Установка и запуск

### Через Docker

1. Убедитесь, что у вас установлены Docker и Docker Compose

2. Клонируйте репозиторий:
   ```bash
   git clone <repository-url>
   cd bookmark-app
   ```

3. Запустите приложение с помощью Docker Compose:
   ```bash
   docker compose up --build
   ```

   Это запустит:
   - PostgreSQL базу данных на порту 5432
   - Rails сервер на порту 3000
   - Frontend сервер на порту 3001

### Локальный запуск

1. Установите Ruby 3.3.6 (рекомендуется использовать rbenv или rvm):
   ```bash
   rbenv install 3.3.6
   rbenv local 3.3.6
   ```

2. Установите зависимости:
   ```bash
   bundle install
   ```

3. Настройте базу данных:
   ```bash
   # Создайте config/database.yml из примера
   cp config/database.yml.example config/database.yml
   
   # Создайте и настройте базу данных
   bundle exec rails db:create
   bundle exec rails db:migrate
   ```

4. Запустите сервер:
   ```bash
   bundle exec rails server -p 3000
   ```

Приложение будет доступно по адресу:
- GraphQL API: http://localhost:3000/graphql

## GraphQL API

### Запросы

- `bookmarks`: Получить список всех закладок

### Мутации

- `createBookmark`: Создать новую закладку
- `updateBookmark`: Обновить существующую закладку
- `deleteBookmark`: Удалить закладку

## Структура проекта

```
bookmark-backend/
├── app/
│   ├── controllers/      # Контроллеры
│   ├── graphql/         # GraphQL схема и типы
│   ├── models/          # Модели
│   └── services/        # Сервисные объекты
├── config/              # Конфигурация Rails
├── db/                  # Миграции и схема базы данных
└── spec/               # Тесты
```

## Разработка

- Для запуска тестов:
  ```bash
  docker compose exec backend bundle exec rspec
  ```

- Для проверки качества кода:
  ```bash
  docker compose exec backend bundle exec rubocop
  ```
