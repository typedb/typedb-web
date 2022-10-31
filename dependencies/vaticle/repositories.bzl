load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/jamesreprise/vaticle-dependencies",
        commit = "2f8226725810de1f352f674b228f19c460c792e7", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
