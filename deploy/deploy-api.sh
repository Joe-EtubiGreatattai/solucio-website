#!/bin/bash
# Builds the committed code (never local-only files) and updates the website backend on the Solucio server.
# Usage: deploy/deploy-api.sh      (run from the project folder; commit first)
set -euo pipefail
SERVER=root@192.3.161.239
APP=/var/www/solucio-website-api
cd "$(dirname "$0")/.."
[ -z "$(git status --porcelain)" ] || { echo "Commit your changes first: only committed code is deployed."; exit 1; }
BUILD=$(mktemp -d)
trap 'rm -rf "$BUILD"' EXIT
git archive HEAD | tar -x -C "$BUILD"
cp -Rc node_modules "$BUILD/node_modules" 2>/dev/null || cp -R node_modules "$BUILD/node_modules"
(cd "$BUILD" && STANDALONE=1 npx next build >/dev/null)
S="$BUILD/.next/standalone"
cp -r "$BUILD/.next/static" "$S/.next/static"
cp -r "$BUILD/public" "$S/public"
rsync -az --delete --exclude .env --exclude .next/cache -e "ssh -o BatchMode=yes" "$S/" "$SERVER:$APP/"
ssh -o BatchMode=yes "$SERVER" "chown -R solucio-website:solucio-website $APP && systemctl restart solucio-website-api && sleep 3 && systemctl is-active solucio-website-api && curl -s -o /dev/null -w 'API answers: %{http_code}\n' http://127.0.0.1:5104/api/health"
echo "Deployed $(git rev-parse --short HEAD)"
