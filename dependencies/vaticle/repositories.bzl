load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/alexjpwalker/dependencies",
        commit = "1f2834d62145e7495ade1b5d7dba0cf6f24d3b2f", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
