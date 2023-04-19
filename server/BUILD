load("@rules_pkg//:pkg.bzl", "pkg_tar")
load("@rules_rust//rust:defs.bzl", "rust_binary")
load("@vaticle_bazel_distribution//common:rules.bzl", "assemble_targz")

SERVER_DEPS = [
    "@crates//:axum",
    "@crates//:clap",
    "@crates//:mime_guess",
    "@crates//:reqwest",
    "@crates//:serde",
    "@crates//:tokio",
    "@crates//:tower-http",
]

rust_binary(
    name = "server",
    srcs = glob(["src/**/*.rs"]),
    deps = SERVER_DEPS,
    data = [
        "//website:srcs",
        "//website:distribution",
        "//website:node_modules",
    ],
)

rust_binary(
    name = "server_local",
    srcs = glob(["src/**/*.rs"]),
    deps = SERVER_DEPS,
)

pkg_tar(
    name = "distribution",
    extension = "tar.gz",
    strip_prefix = ".",
    srcs = [
        "//server",
        "//schema:srcs",
        "//website:srcs",
#        "//website:distribution",
    ],
    visibility = ["//deployment/docker:__pkg__"]
)

#assemble_targz(
#    name = "distribution",
#    targets = [],
#    additional_files = {
#        "//server": "server",
#        "//website:srcs": "website",
#        "//website:distribution": "website/dist/dynamic"
#    },
#    output_filename = "typedb-web",
#    append_version = False,
#    visibility = ["//deployment/docker:__pkg__"]
#)
