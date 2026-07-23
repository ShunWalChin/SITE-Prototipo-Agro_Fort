#!/usr/bin/env bash
set -euo pipefail

domain="agrofort.64.181.178.125.nip.io"
source_config="/home/opc/apps/agrofort/current/deploy/agrofort.nginx.conf"
target_config="/etc/nginx/conf.d/agrofort.conf"
backup_dir="/home/opc/apps/agrofort/backups"
backup_config="${backup_dir}/agrofort.conf.$(date +%Y%m%d-%H%M%S)"

test -f "$source_config"
mkdir -p "$backup_dir"

had_config=false
if sudo test -f "$target_config"; then
  sudo cp "$target_config" "$backup_config"
  had_config=true
fi

sudo install -o root -g root -m 0644 "$source_config" "$target_config"

if ! sudo nginx -t; then
  if [[ "$had_config" == "true" ]]; then
    sudo cp "$backup_config" "$target_config"
  else
    sudo rm -f "$target_config"
  fi
  sudo nginx -t
  exit 1
fi

sudo systemctl reload nginx

echo "<HTTP_BEFORE_TLS>"
curl --resolve "${domain}:80:127.0.0.1" -fsS -o /dev/null -w '%{http_code}|%{time_total}\n' "http://${domain}/"

echo "<CERTIFICATE>"
if ! sudo test -f "/etc/letsencrypt/live/${domain}/fullchain.pem"; then
  sudo certbot --nginx \
    --non-interactive \
    --agree-tos \
    --register-unsafely-without-email \
    --redirect \
    -d "$domain"
fi

bash /home/opc/apps/agrofort/current/deploy/apply-nginx-hardening.sh

echo "<HTTPS>"
curl -fsS -o /dev/null -w '%{http_code}|%{remote_ip}|%{ssl_verify_result}|%{time_total}\n' "https://${domain}/"

echo "<CERTIFICATE_DATES>"
echo | openssl s_client -servername "$domain" -connect "${domain}:443" 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
