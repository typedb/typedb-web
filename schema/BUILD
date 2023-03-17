#load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")
#
#filegroup(
#    name = "schema",
#    srcs = glob([
#        "sanity-core/*.ts",
#        "util/*.ts",
#        "*.ts",
#        "package.json",
#        "tsconfig.json",
#    ]),
#    visibility = ["//website:__pkg__"],
#)
#
#copy_to_bin(
#    name = "action",
#    srcs = ["action.ts"],
#    visibility = ["//website:__subpackages__"],
#)
#
#copy_to_bin(
#    name = "index",
#    srcs = ["index.ts"],
#    visibility = ["//website:__subpackages__"],
#)

load("@aspect_rules_js//npm:defs.bzl", "npm_package")
npm_package(
    name = "schema",
    srcs = glob([
       "sanity-core/*.ts",
       "util/*.ts",
       "*.ts",
       "package.json",
       "tsconfig.json",
    ]),
    visibility = ["//website:__pkg__"],
)
