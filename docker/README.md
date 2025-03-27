# Docker конфигурация для Bookmark App

Этот каталог содержит Docker-конфигурацию для запуска всего приложения Bookmark App, включая:
- Frontend (React)
- Backend (Ruby on Rails)
- База данных (PostgreSQL)

## Требования

- Docker
- Docker Compose

## Запуск приложения

1. Убедитесь, что вы находитесь в корневой директории проекта
2. Запустите все сервисы:
```bash
cd docker
docker-compose up
```

Приложение будет доступно по следующим адресам:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432

## Остановка приложения

```bash
docker-compose down
```

## Очистка данных

Для полной очистки данных (включая базу данных):
```bash
docker-compose down -v
```

## Структура

- `Dockerfile` - конфигурация для сборки frontend-контейнера
- `docker-compose.yml` - конфигурация всех сервисов приложения 