#!/bin/sh

DB_HOST=$(echo "$DATABASE_URL" | sed -E 's|.*@([^:/]+).*|\1|')
DB_PORT=$(echo "$DATABASE_URL" | sed -E 's|.*:([0-9]+)/.*|\1|')
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"

echo "Waiting for database (${DB_HOST}:${DB_PORT}) to be ready..."
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "Database is up!"

echo "Running database migrations..."
npx prisma migrate deploy

echo "Generating Prisma client..."
npx prisma generate

if [ "$NODE_ENV" = "production" ]; then
  echo "Running database seed (idempotent - skips if already seeded)..."
  npx ts-node prisma/seed.ts
  echo "Starting production server..."
  npm run start
else
  echo "Starting development server..."
  npm run dev
fi
