#!/usr/bin/env bash
set -e

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Fixing static files permissions..."
chmod -R 755 /app/staticfiles

echo "Starting Gunicorn..."
exec gunicorn --bind 0.0.0.0:8000 webapp.wsgi:application \
    --workers 3 \
    --timeout 120 \
    --log-level debug
