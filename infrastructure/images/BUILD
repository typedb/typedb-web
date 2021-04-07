load("@graknlabs_bazel_distribution//packer:rules.bzl", "deploy_packer")
load("@graknlabs_bazel_distribution//gcp:rules.bzl", "assemble_gcp")

assemble_gcp(
    name = "assemble-gcp-nomad",
    install = "//infrastructure/images:install-nomad.sh",
    files = {},
    project_id = "vaticle-web-prod",
    disable_default_service_account = True,
    image_name = "nomad",
    source_image_family = "ubuntu-2004-lts",
    image_family = "nomad",
    zone = "europe-west1-b"
)

deploy_packer(
    name = "deploy-gcp-nomad",
    target = ":assemble-gcp-nomad",
)
