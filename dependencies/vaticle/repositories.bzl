load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/vaticle/dependencies",
        commit = "3a58ebd1f1e249b21b8d8bd07c7415d127aa9dc1", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
