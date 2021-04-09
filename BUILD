load("@graknlabs_bazel_distribution//common:rules.bzl", "assemble_targz")
load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")

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
