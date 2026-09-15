#!/usr/bin/env bash
# Idempotent Cloud Agent install script for Symfonix Business Suite.
# Prepares system packages (PHP 8.3, MySQL, Redis, Composer), installs
# PHP/JS dependencies, builds frontend assets, and runs migrations + seeders.
set -euo pipefail

cd "$(dirname "$0")/.."
export DEBIAN_FRONTEND=noninteractive

DB_USER="root"
DB_PASS="root"
DB_NAME="hado_saas"
DB_TEST_NAME="hado_saas_test"

mysql_tcp() {
  mysql -u"$DB_USER" -p"$DB_PASS" -h127.0.0.1 -P3306 --protocol=TCP "$@"
}

echo "==> Installing system packages"
if ! command -v php >/dev/null 2>&1 || ! command -v mysql >/dev/null 2>&1; then
  sudo apt-get update -y
  sudo apt-get install -y \
    php8.3-cli php8.3-common php8.3-mysql php8.3-mbstring php8.3-xml \
    php8.3-curl php8.3-zip php8.3-gd php8.3-bcmath php8.3-intl \
    php8.3-redis php8.3-sqlite3 php8.3-gmp \
    mysql-server redis-server unzip
fi

echo "==> Ensuring Composer is available"
if ! command -v composer >/dev/null 2>&1; then
  curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
  sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
  rm -f /tmp/composer-setup.php
fi

echo "==> Starting MySQL"
sudo service mysql start
for _ in $(seq 1 30); do
  sudo mysqladmin ping >/dev/null 2>&1 && break
  sleep 1
done

echo "==> Configuring MySQL root user and databases"
# On a fresh install root@localhost uses auth_socket, so `sudo mysql` works and
# we can switch it to password auth. On later runs this branch is skipped.
if sudo mysql -e "SELECT 1" >/dev/null 2>&1; then
  sudo mysql -e "ALTER USER '${DB_USER}'@'localhost' IDENTIFIED WITH mysql_native_password BY '${DB_PASS}'; FLUSH PRIVILEGES;"
fi
mysql_tcp -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql_tcp -e "CREATE DATABASE IF NOT EXISTS ${DB_TEST_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo "==> Preparing .env"
[ -f .env ] || cp .env.example .env

echo "==> Installing PHP dependencies"
composer install --no-interaction --no-progress

echo "==> Generating application key (if missing)"
grep -q '^APP_KEY=base64:' .env || php artisan key:generate --ansi

echo "==> Installing JS dependencies and building assets"
npm install
npm run build

echo "==> Running migrations"
php artisan migrate --force

echo "==> Seeding baseline data + admin user (first run only)"
INSTALLED_USERS="$(mysql_tcp -N -e "SELECT COUNT(*) FROM ${DB_NAME}.users" 2>/dev/null || echo 0)"
if [ "${INSTALLED_USERS}" = "0" ]; then
  php artisan app:install --no-interaction
else
  echo "    users table already populated; skipping app:install"
fi

echo "==> Install complete"
