load("@vaticle_bazel_distribution//common:rules.bzl", "assemble_targz")
load("@vaticle_dependencies//distribution:deployment.bzl", "deployment")
load("@vaticle_bazel_distribution//artifact:rules.bzl", "deploy_artifact")

WEB_MAIN_DIST_ADDITIONAL_FILES = {
    "//server/resources:conf/web-main.properties": "resources/conf/web-main.properties",
    "//server:server-bin_deploy.jar": "server.jar",
}

assemble_targz(
    name = "web-main-dev",
    additional_files = WEB_MAIN_DIST_ADDITIONAL_FILES,
    targets = [
        "//web:react-pages-dev",
        "//conferences",
    ],
    output_filename = "web-main-dev"
)

assemble_targz(
    name = "web-main",
    additional_files = WEB_MAIN_DIST_ADDITIONAL_FILES,
    targets = [
        "//web:react-pages",
        "//conferences",
    ],
    output_filename = "web-main"
)

deploy_artifact(
    name = "deploy-web-main",
    target = ":web-main",
    artifact_group = "vaticle_web_main",
    artifact_name = "web-main-{version}.tar.gz",
    release = deployment['artifact.release'],
    snapshot = deployment['artifact.snapshot'],
)

# CI targets that are not declared in any BUILD file, but are called externally
filegroup(
    name = "ci",
    data = [
        "@vaticle_dependencies//tool/release/version:bump",
    ],
)
