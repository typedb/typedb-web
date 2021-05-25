load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/alexjpwalker/dependencies",
        commit = "20254e193c55c7a2ba67d6dafbc094037db7f74b", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
