load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/vaticle/dependencies",
        commit = "84fab8dbe0b48f983d99ccd803b3a0607173a2ee", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
