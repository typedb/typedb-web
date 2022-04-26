load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/alexjpwalker/dependencies",
        commit = "da0c4b5a2c430c90005f700acca98f89a6f11924", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
