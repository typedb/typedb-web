package(default_visibility = ["//:__pkg__"])

load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")

pkg_tar(
    name = "cosmos-2020",
    srcs = glob(["**/*"], exclude = ["BUILD"]),
    strip_prefix = ".",
    package_dir = "dist/events/cosmos-2020",
)
