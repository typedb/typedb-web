load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/vaticle/dependencies",
        commit = "fea309739f06c27699761508d445e6b30f160619", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
