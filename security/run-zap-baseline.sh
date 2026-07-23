#!/usr/bin/env bash
set -euo pipefail

target="${1:-https://agrofort.64.181.178.125.nip.io}"
report_dir="${2:-$(pwd)/zap-reports}"

mkdir -p "$report_dir"
docker run --rm --init \
  --memory=1536m --cpus=1 --pids-limit=512 \
  -v "${report_dir}:/zap/wrk/:rw" \
  ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py \
  -t "$target" \
  -m 2 \
  -I \
  -J zap-baseline.json \
  -r zap-baseline.html \
  -w zap-baseline.md
