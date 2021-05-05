load("@graknlabs_bazel_distribution//common:rules.bzl", "assemble_targz")
load("@graknlabs_dependencies//distribution:deployment.bzl", "deployment")
load("@graknlabs_bazel_distribution//artifact:rules.bzl", "deploy_artifact")

WEB_MAIN_DIST_ADDITIONAL_FILES = {
    "//server/resources/conf:web-main.properties": "resources/conf/web-main.properties",
    "//server:server-bin_deploy.jar": "server.jar",
}

assemble_targz(
    name = "web-main-dev",
    additional_files = WEB_MAIN_DIST_ADDITIONAL_FILES,
    targets = [
        "//pages:pages-dev",
    ],
    output_filename = "web-main-dev"
)

assemble_targz(
    name = "web-main",
    additional_files = WEB_MAIN_DIST_ADDITIONAL_FILES,
    targets = [
        "//pages:pages",
    ],
    output_filename = "web-main"
)

deploy_artifact(
    name = "deploy-web-main",
    target = ":web-main",
    artifact_group = "graknlabs_web_main",
    artifact_name = "web-main-{version}.tar.gz",
    release = deployment['artifact.release'],
    snapshot = deployment['artifact.snapshot'],
)
