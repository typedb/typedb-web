set -eux

cd $BUILD_WORKSPACE_DIRECTORY
sed -i -e "s/{COMMIT_SHA}/$(git rev-parse HEAD)/g" deployment/helm/values.yaml
