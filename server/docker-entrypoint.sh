#!/bin/sh

echo "Waiting for database (db:5432) to be ready..."
while ! nc -z db 5432; do
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
