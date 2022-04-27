load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/alexjpwalker/dependencies",
        commit = "b1f8f52542ab587756d77c6f7a2bebe0e6d629c5", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
