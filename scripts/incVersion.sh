#!/usr/bin/env bash

MINOR_VERSION=$(node -p -e "parseInt(require('./package.json').version.split('.')[1], 10)")
PATCH_VERSION=$(node -p -e "parseInt(require('./package.json').version.split('.')[2], 10)")

if [ "$PATCH_VERSION" -lt 9 ]; then
  yarn version --patch --no-commit-hooks --no-git-tag-version
elif [ "$MINOR_VERSION" -lt 9 ]; then
  yarn version --minor --no-commit-hooks --no-git-tag-version
else
  yarn version --major --no-commit-hooks --no-git-tag-version
fi

yarn version-app
