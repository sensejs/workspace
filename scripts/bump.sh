#/bin/sh
# Generate changelog from changeset status, this need to be run before bumping the version
./global-changelog.js

# Bump the version
changeset version

# Keep lockfile up to date
pnpm -r install
