load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/alexjpwalker/dependencies",
        commit = "2e3554398106e3fd6d165192c4a8ca2a76838a85", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
