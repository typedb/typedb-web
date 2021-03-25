load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def graknlabs_dependencies():
    git_repository(
        name = "graknlabs_dependencies",
        remote = "https://github.com/graknlabs/dependencies",
        commit = "5cff3a6cf388fe799b6e27af4772384fbbfc317b", # sync-marker: do not remove this comment, this is used for sync-dependencies by @graknlabs_dependencies
    )
