# First dry run to change all package version
DIST_TAG=$2
if [[ -n "$DIST_TAG" ]]; then
  DIST_TAG="--tag=$DIST_TAG"
fi
pnpm recursive run cleanup
pnpm recursive run prepare
PNPM_RECURSIVE='pnpm recursive --workspace-concurrency=1 --filter ./packages'
$PNPM_RECURSIVE exec -- pnpm version --no-git-tag-version $1
$PNPM_RECURSIVE publish $DIST_TAG
