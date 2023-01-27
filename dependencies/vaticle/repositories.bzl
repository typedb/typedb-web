load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/vaticle/dependencies",
        commit = "83a76ea1ccfc4e758b8a97540f41c11c6e3dc2bb",  # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
