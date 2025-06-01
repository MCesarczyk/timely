#!/bin/sh

cmd="$@"

sleep 5
echo "Running migrations..."
npx prisma migrate deploy
npx prisma generate

exec $cmd
