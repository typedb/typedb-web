load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/alexjpwalker/dependencies",
        commit = "2101534fa491864e7635db529c93f44a8bb37c3d", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
