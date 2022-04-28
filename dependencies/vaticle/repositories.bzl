load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/vaticle/dependencies",
        commit = "8d61f5a1e6298e15f5b71249e8f990c510620b72", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
