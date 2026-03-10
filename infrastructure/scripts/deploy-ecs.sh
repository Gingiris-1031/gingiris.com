#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/infrastructure/docker/docker-compose.ecs.yml"
ENV_FILE="${DEPLOY_ENV_FILE:-$ROOT_DIR/.env.production}"

cd "$ROOT_DIR"

"$ROOT_DIR/infrastructure/scripts/validate-production-env.sh" "$ENV_FILE"
docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" config >/dev/null
docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" build
docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d --remove-orphans
