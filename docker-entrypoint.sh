#!/bin/sh
set -e

echo "=========================================="
echo "Medkey Frontend - Development Server"
echo "=========================================="

# Vérifier si les dépendances sont installées (vérification plus robuste)
if [ ! -d node_modules ] || [ ! -f node_modules/.bin/vue-cli-service ] || [ ! -d node_modules/@vue ]; then
  echo "📦 Installing dependencies..."
  yarn install --network-timeout 600000 --network-concurrency 1 --ignore-engines --prefer-offline --frozen-lockfile || \
  yarn install --network-timeout 600000 --network-concurrency 1 --ignore-engines --prefer-offline
  echo "✅ Dependencies installed"
else
  echo "✅ Dependencies already installed (using cached node_modules)"
fi

echo "🚀 Starting Vue development server..."
yarn serve --host 0.0.0.0

