load("@graknlabs_bazel_distribution//packer:rules.bzl", "deploy_packer")
load("@graknlabs_bazel_distribution//gcp:rules.bzl", "assemble_gcp")

assemble_gcp(
    name = "assemble-gcp-nomad-server",
    install = "//infrastructure/nomad/images:install-nomad-server.sh",
    project_id = "vaticle-web-prod",
    disable_default_service_account = True,
    image_name = "nomad-server-{{user `version`}}",
    source_image_family = "ubuntu-2004-lts",
    image_family = "web",
    zone = "europe-west2-b"
)

deploy_packer(
    name = "deploy-gcp-nomad-server",
    target = ":assemble-gcp-nomad-server",
)

assemble_gcp(
    name = "assemble-gcp-nomad-client",
    install = "//infrastructure/nomad/images:install-nomad-client.sh",
    project_id = "vaticle-web-prod",
    disable_default_service_account = True,
    image_name = "nomad-client-{{user `version`}}",
    source_image_family = "ubuntu-2004-lts",
    image_family = "web",
    zone = "europe-west2-b"
)

deploy_packer(
    name = "deploy-gcp-nomad-client",
    target = ":assemble-gcp-nomad-client",
)
