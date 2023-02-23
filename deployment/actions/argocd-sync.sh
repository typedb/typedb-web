set -eu

GCP_PROJECT=$1
GKE_CLUSTER=$2
DEPLOYMENT_REPO_ORG=$3
DEPLOYMENT_REPO_NAME=$4

cd $BUILD_WORKSPACE_DIRECTORY
bazel run //deployment/argocd:sync -- \
    --gcp-project $GCP_PROJECT \
    --gke-cluster $GKE_CLUSTER \
    --gcp-service-account-credentials $GCP_SERVICE_ACCOUNT_CREDENTIALS \
    --deployment-repo $DEPLOYMENT_REPO_ORG/$DEPLOYMENT_REPO_NAME
