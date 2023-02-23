set -eu

GCP_PROJECT=$1
GCP_SERVICE_ACCOUNT_NAME=$2
GKE_CLUSTER=$3
DEPLOYMENT_REPO_ORG=$4
DEPLOYMENT_REPO_NAME=$5

cd $BUILD_WORKSPACE_DIRECTORY
bazel run //deployment/repo:update -- \
    --gcp-project $GCP_PROJECT \
    --gcp-service-account-name $GCP_SERVICE_ACCOUNT_NAME \
    --gke-cluster $GKE_CLUSTER \
    --deployment-repo $DEPLOYMENT_REPO_ORG/$DEPLOYMENT_REPO_NAME \
    --helm-chart="0.0.0-$(git rev-parse HEAD)"
