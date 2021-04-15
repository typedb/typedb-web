load("@graknlabs_bazel_distribution//packer:rules.bzl", "deploy_packer")
load("@graknlabs_bazel_distribution//gcp:rules.bzl", "assemble_gcp")

assemble_gcp(
    name = "assemble-gcp-nomad-server",
    install = "//infrastructure/nomad/images:install-nomad-server.sh",
    files = {
        "nomad-server.hcl": "nomad-server.hcl"
    },
    project_id = "vaticle-web-prod",
    disable_default_service_account = True,
    image_name = "nomad-server",
    source_image_family = "ubuntu-2004-lts",
    image_family = "website",
    zone = "europe-west1-b"
)

deploy_packer(
    name = "deploy-gcp-nomad-server",
    target = ":assemble-gcp-nomad-server",
    overwrite = True,
)

assemble_gcp(
    name = "assemble-gcp-nomad-client",
    install = "//infrastructure/nomad/images:install-nomad-client.sh",
    files = {
        "nomad-client.hcl": "nomad-client.hcl"
    },
    project_id = "vaticle-web-prod",
    disable_default_service_account = True,
    image_name = "nomad-client",
    source_image_family = "ubuntu-2004-lts",
    image_family = "website",
    zone = "europe-west1-b"
)

deploy_packer(
    name = "deploy-gcp-nomad-client",
    target = ":assemble-gcp-nomad-client",
    overwrite = True,
)
