#!/bin/sh

# Extract host and port from DATABASE_URL (postgresql://user:password@host:port/database)
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set. Cannot determine database host/port." >&2
  exit 1
fi

# Strip the scheme and credentials to isolate host:port/dbname
DB_HOSTPORT=$(echo "$DATABASE_URL" | sed -E 's|^[^:]+://[^@]+@([^/]+)/.*|\1|')
DB_HOST=$(echo "$DB_HOSTPORT" | cut -d: -f1)
DB_PORT=$(echo "$DB_HOSTPORT" | cut -d: -f2)

# Default to 5432 if no port was found in the URL
if [ -z "$DB_PORT" ] || [ "$DB_PORT" = "$DB_HOST" ]; then
  DB_PORT=5432
fi

echo "Waiting for database ($DB_HOST:$DB_PORT) to be ready..."
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
