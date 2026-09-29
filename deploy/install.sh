#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
[ -f .env ] || cp .env.example .env
if grep -Eq 'CHANGE_ME|PUT_YOUR|PUT_A_ADDRESS|PUT_B_ADDRESS' .env; then echo '请先完成 .env：密码、API_KEY、INTERNAL_WATCHER_KEY、A/B 地址、监控收款地址'; exit 1; fi
docker compose -f deploy/docker-compose.yml up -d --build
echo 'TRON Permission Control V5 server is running.'
