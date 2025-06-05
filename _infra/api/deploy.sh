#!/bin/bash

SCRIPT_NAME=$(basename "$0")

# Check if already runnning
if pgrep -f "$SCRIPT_NAME" | grep -v $$ > /dev/null; then
    exit 0
fi

docker login registry.gitlab.com -u $USER -p $ACCESS_TOKEN
docker compose pull api
docker compose up -d api
docker image prune -af
