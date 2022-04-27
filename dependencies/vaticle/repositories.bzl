load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/alexjpwalker/dependencies",
        commit = "13148d4a287bdd7a49e0ad66ca8f5d4f8d5288c4", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
