# syntax = docker/dockerfile:1

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=3.3.6
FROM --platform=linux/arm64/v8 registry.docker.com/library/ruby:$RUBY_VERSION-slim

# Rails app lives here
WORKDIR /app

# Set development environment
ENV RAILS_ENV="development" \
    BUNDLE_PATH="/usr/local/bundle" \
    PATH="/usr/local/bundle/bin:$PATH"

# Install packages needed to build gems and run Rails
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev pkg-config netcat-traditional postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install application gems
COPY bookmark-backend/Gemfile bookmark-backend/Gemfile.lock ./
RUN bundle install

# Copy application code
COPY bookmark-backend .

# Entrypoint prepares the database.
COPY docker/backend/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"] 