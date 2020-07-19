#!/usr/bin/env bash

set -e;
set -o pipefail;

if [ -z $ORGANIZATION ]; then
    printf "%s\n" "Missing required GITHUB_ORG environment variable"
    exit 1
elif [ -z $ORG_OWNER_TOKEN ]; then
    printf "%s\n" "Missing required GITHUB_TOKEN environment variable"
    exit 1
fi

node /app/main.js
