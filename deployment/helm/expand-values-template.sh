set -ex

sed -i -e "s/{COMMIT_SHA}/$(git rev-parse HEAD)/g" deployment/helm/values.yaml
