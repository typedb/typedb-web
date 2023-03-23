load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/alexjpwalker/dependencies",
        commit = "e11ee36f2e5a8e9749355a58cb5dbf85566daf0e",  # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
