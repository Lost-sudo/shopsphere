#!/bin/sh

# Wait for the database to be ready using netcat
echo "Waiting for database (db:5432) to be ready..."
while ! nc -z db 5432; do
  sleep 1
done

echo "Database is up!"

# Run migrations (non-interactive db push for dev sync)
echo "Syncing database schema..."
npx prisma db push

# Generate Prisma client (outputs to src/generated/client as per schema.prisma)
echo "Generating Prisma client..."
npx prisma generate

# Start the application
echo "Starting application..."
npm run dev
