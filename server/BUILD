load("@rules_rust//rust:defs.bzl", "rust_binary")
load("@vaticle_bazel_distribution//common:rules.bzl", "assemble_targz")

rust_binary(
    name = "server",
    srcs = glob(["src/**/*.rs"]),
    deps = [
        "@crates//:axum",
        "@crates//:clap",
        "@crates//:mime_guess",
        "@crates//:reqwest",
        "@crates//:tokio",
    ],
    data = [ "//website:distribution" ],
)

assemble_targz(
    name = "distribution",
    targets = [],
    additional_files = {
        "//server": "server",
        "//website:distribution": "website"
    },
    empty_directories = ["website/assets"],
    permissions = {
        "website/assets": "0755"
    },
    output_filename = "typedb-web",
    append_version = False,
    visibility = ["//deployment/docker:__pkg__"]
)
