load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/alexjpwalker/dependencies",
        commit = "1f90e3d927d7e5ed86587cdae86627624fbf09c1", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
