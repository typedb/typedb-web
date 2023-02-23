set -eux

sed -i -e "s/{COMMIT_SHA}/$(git rev-parse HEAD)/g" $BUILD_WORKSPACE_DIRECTORY/deployment/helm/values.yaml
