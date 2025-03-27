# Bookmark App

Приложение для управления закладками с GraphQL API на Ruby on Rails и React фронтендом.

## Структура проекта

Проект состоит из двух основных частей:

### Backend (`/bookmark-backend`)

REST API сервер на Ruby on Rails с GraphQL:

- Ruby 3.3.6
- Rails 7.1.5
- PostgreSQL
- GraphQL API
- RSpec для тестирования

[Подробнее о backend части](./bookmark-backend/README.md)

### Frontend (`/bookmark-frontend`)

Single Page Application на React:

- React
- Material-UI для компонентов
- Apollo Client для GraphQL
- Современный адаптивный дизайн

[Подробнее о frontend части](./bookmark-frontend/README.md)

## Основные возможности

- ✨ Создание, редактирование и удаление закладок
- 🔍 Поиск по названию и URL
- 📱 Адаптивный дизайн для мобильных устройств
- 🚀 GraphQL API для эффективного взаимодействия

## Запуск проекта

### С использованием Docker

```bash
# Клонировать репозиторий
git clone https://github.com/lireirelico/bookmark_app.git
cd bookmark_app

# Запустить с помощью Docker Compose
docker-compose up
```

После запуска:
- Frontend будет доступен по адресу: http://localhost:3001
- Backend API: http://localhost:3000/graphql

### Локальный запуск

Смотрите инструкции по локальному запуску в README.md каждой части проекта:
- [Backend setup](./bookmark-backend/README.md)
- [Frontend setup](./bookmark-frontend/README.md)

MIT 