#!/usr/bin/env bash
# Build the published site into site/: one version, the newest, under
# DOCS_BASE (default /garth-docs, where GitHub Pages serves this repository).
set -euo pipefail
npm ci --no-audit --no-fund >/dev/null
npx astro build
rm -rf site
cp -r dist site
