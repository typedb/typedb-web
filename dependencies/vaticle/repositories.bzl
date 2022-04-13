load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/lolski/dependencies",
        commit = "573fc693d11144db5fa54d579eddfd7140b61be2", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
