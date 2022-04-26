load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def vaticle_dependencies():
    git_repository(
        name = "vaticle_dependencies",
        remote = "https://github.com/alexjpwalker/dependencies",
        commit = "60ffcae4ff672dfffb4b0f8316e1b1fd908d68a2", # sync-marker: do not remove this comment, this is used for sync-dependencies by @vaticle_dependencies
    )
