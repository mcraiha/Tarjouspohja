#!/bin/bash
# Aja deno:lla
sh src/taydenna.sh

# Tee bundlaus
deno bundle -c tsconfig.json src/index.ts src/index.js