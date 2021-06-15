## Infrastructure manual

**NOTE:** All the following code assumes you have GCP credentials and nomad credential environment variables set up in your shell. Refer to `web-infrastructure` repo on how to set them up.

#### Deployment

1. First we need to deploy the nomad client to run the web-main server. We can change the nomad client image version to the one we desire. You don't need to perform this step if there's no change needed for the server hardware.

    ```
   terraform plan && terraform apply
    ```

2. We then need to insert the following credentials needed by the web-main server to run. You don't need to perform this step if the credentials are already present on the vault server.

    ```
   vault kv put web/keystore value=$(cat keystore | base64)
   vault kv put web/keystore-password value=$(cat keystore-password)
   vault kv put web-main/application-secret value=$(cat application-secret)
    ```
 
3. Deploy the new version of web-main to `repo.vaticle.com`.

    ```
   DEPLOY_ARTIFACT_USERNAME=<username> DEPLOY_ARTIFACT_PASSWORD=<password> bazel run --define version=$(cat VERSION) //:deploy-web-main -- snapshot
    ```
   
4. Run the new web-main application through nomad.

    ```
   VERSION=$(cat VERSION) envsubst <web-main.nomad | nomad job run -
    ```
