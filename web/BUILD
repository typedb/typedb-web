load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")
load(":rules.bzl", "assemble_react")

exports_files(["package.json", "yarn.lock"])

filegroup(
    name = "content",
    srcs = glob(["**/*", "*.json", "*.js"]),
)

assemble_react(
    name = "pages-dev",
    srcs = [":content"],
    package_dir = "web",
    webpack_output_path = "pages",
    visibility = ["//visibility:public"],
    react_build_mode = "development",
)

assemble_react(
    name = "pages",
    srcs = [":content"],
    package_dir = "web",
    webpack_output_path = "pages",
    visibility = ["//visibility:public"],
    react_build_mode = "production",
)

nodejs_binary(
    name = "webpack_cli_bazel_wrapper",
    data = [
        "@npm//webpack-cli",
        "@npm//babel-loader",
        "@npm//babel-eslint",
        "@npm//sass-loader",
        "@npm//clean-webpack-plugin",
        "@npm//html-webpack-plugin"
    ],
    entry_point = "@npm//:node_modules/webpack-cli/bin/cli.js",
    visibility = ["//visibility:public"]
)
