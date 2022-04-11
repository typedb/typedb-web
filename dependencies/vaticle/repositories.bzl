load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/lolski/dependencies",
        commit = "2df529c3a23deff7df7c281b5f2858336cd4c759", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
