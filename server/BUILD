load("@rules_rust//rust:defs.bzl", "rust_binary")
load("@vaticle_bazel_distribution//common:rules.bzl", "assemble_targz")

rust_binary(
    name = "bin",
    srcs = glob(["src/**/*.rs"]),
    deps = [
        "@crates//:axum",
        "@crates//:clap",
        "@crates//:mime_guess",
        "@crates//:tokio",
    ],
#    data = [ "//application/frontend:distribution" ],
)

assemble_targz(
    name = "distribution",
    targets = [],
    additional_files = {
        "//server:bin": "server",
#        "//application/frontend:distribution": "frontend"
    },
#    empty_directories = ["frontend/assets"],
#    permissions = {
#        "frontend/assets": "0755"
#    },
    output_filename = "typedb-web",
    append_version = False,
    visibility = ["//deployment/docker:__pkg__"]
)
