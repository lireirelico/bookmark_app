#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /app/tmp/pids/server.pid

# Wait for postgres
echo "Waiting for postgres database connection..."
until PGPASSWORD=password psql -h "db" -U "postgres" -d "bookmark_app_development" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
echo "Postgres is up - executing command"

# Create the database if it doesn't exist
bundle exec rails db:prepare

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@" 