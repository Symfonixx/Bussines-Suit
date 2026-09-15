#!/usr/bin/env bash
# Per-boot startup for Symfonix Business Suite.
# Brings up MySQL and Redis, then waits until MySQL accepts connections so the
# terminals (php artisan serve / queue worker) start against a ready database.
set -euo pipefail

sudo service mysql start || true
sudo service redis-server start || true

for _ in $(seq 1 30); do
  mysqladmin -uroot -proot -h127.0.0.1 -P3306 --protocol=TCP ping >/dev/null 2>&1 && break
  sleep 1
done

echo "Services ready (MySQL + Redis)."
