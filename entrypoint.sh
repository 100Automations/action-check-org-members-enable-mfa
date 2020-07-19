#!/usr/bin/env bash

set -e;
set -o pipefail;

if [ -z $GITHUB_ORG ]; then
    printf "%s\n" "Missing required GITHUB_ORG environment variable"
    exit 1
elif [ -z $GITHUB_TOKEN ]; then
    printf "%s\n" "Missing required GITHUB_TOKEN environment variable"
    exit 1
fi

node main.js
