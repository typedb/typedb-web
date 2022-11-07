load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/vaticle/dependencies",
        commit = "4464b506ca469f37d3b696fb2f1eda34061cdaa1",  # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
