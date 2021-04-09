load("@graknlabs_bazel_distribution//common:rules.bzl", "assemble_targz")

assemble_targz(
    name = "web-main",
    additional_files = {
        "//server:server-bin_deploy.jar": "server.jar",
    },
    targets = [
        "//pages:pages",
    ],
    output_filename = "web-main"
)
