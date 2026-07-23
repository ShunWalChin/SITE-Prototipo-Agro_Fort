#!/usr/bin/env bash
set -euo pipefail

source_config="/home/opc/apps/agrofort/current/deploy/agrofort.nginx.production.conf"
target_config="/etc/nginx/conf.d/agrofort.conf"
backup_dir="/home/opc/apps/agrofort/backups"
backup_config="${backup_dir}/agrofort.conf.$(date +%Y%m%d-%H%M%S)"

test -f "$source_config"
sudo test -f /etc/letsencrypt/live/agrofort.64.181.178.125.nip.io/fullchain.pem
mkdir -p "$backup_dir"
sudo cp "$target_config" "$backup_config"
sudo install -o root -g root -m 0644 "$source_config" "$target_config"

if ! sudo nginx -t; then
  sudo cp "$backup_config" "$target_config"
  sudo nginx -t
  echo "Nginx policy rejected; previous configuration restored." >&2
  exit 1
fi

sudo systemctl reload nginx
echo "Nginx hardening applied. Backup: ${backup_config}"
