#!/usr/bin/env bash
set -euo pipefail

release="${1:?release id required}"
archive="${2:?archive path required}"
base="/home/opc/apps/agrofort"
destination="${base}/releases/${release}"

if [[ ! "$release" =~ ^[0-9]{8}-[0-9]{6}$ ]]; then
  echo "Invalid release id" >&2
  exit 2
fi

test -f "$archive"
test ! -e "$destination"

mkdir -p "$destination"
tar -xzf "$archive" -C "$destination"
cd "$destination"

for required in package.json package-lock.json Dockerfile docker-compose.yml deploy/agrofort.nginx.conf; do
  test -f "$required"
done

echo "<COMPOSE_VALIDATE>"
docker compose -p agrofort config --quiet

echo "<BUILD_AND_START>"
docker compose -p agrofort up -d --build --remove-orphans

echo "<HEALTH_WAIT>"
for attempt in $(seq 1 24); do
  state="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' agrofort-web 2>/dev/null || true)"
  printf 'attempt=%s state=%s\n' "$attempt" "$state"
  if [[ "$state" == "healthy" ]]; then
    break
  fi
  if [[ "$state" == "unhealthy" || "$state" == "exited" ]]; then
    docker logs --tail 120 agrofort-web
    exit 1
  fi
  sleep 5
done

test "$(docker inspect --format '{{.State.Health.Status}}' agrofort-web)" = "healthy"
ln -sfn "$destination" "${base}/current"
rm -f "$archive"

echo "<CONTAINER>"
docker ps --filter name=agrofort-web --format '{{.Names}}|{{.Status}}|{{.Ports}}|{{.Networks}}'

echo "<LOCAL_HTTP>"
curl -fsS -o /dev/null -w '%{http_code}|%{size_download}|%{time_total}\n' http://127.0.0.1:4188/
