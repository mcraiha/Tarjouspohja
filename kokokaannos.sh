#!/bin/bash
# Aja deno:lla
current_date=$(date --iso-8601=minutes)
tsc_version=$(deno eval "console.log(Deno.version.typescript)")
git_short_hash=$(git rev-parse --short HEAD)

echo $current_date
echo $tsc_version
echo $git_short_hash

sed -i "s/{0}/$tsc_version/g" src/index.ts
sed -i "s/{1}/$git_short_hash/g" src/index.ts
sed -i "s/{2}/$current_date/g" src/index.ts

# Tee bundlaus
deno bundle -c tsconfig.json src/index.ts src/index.js