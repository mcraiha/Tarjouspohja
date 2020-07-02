#!/bin/bash
# Täydentää muuttujat
current_date=$(date --iso-8601=minutes)
tsc_version=$(tsc --version)
git_short_hash=$(git rev-parse --short HEAD)

echo $current_date
echo $tsc_version
echo $git_short_hash

sed -i "s/{0}/$tsc_version/g" index.ts
sed -i "s/{1}/$git_short_hash/g" index.ts
sed -i "s/{2}/$current_date/g" index.ts