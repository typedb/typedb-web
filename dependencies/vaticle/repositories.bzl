load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/alexjpwalker/dependencies",
        commit = "79bb6052eddac65dfa9d8f304c6b457ffe942f33", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
