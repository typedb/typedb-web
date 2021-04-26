load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

def graknlabs_dependencies():
    git_repository(
        name = "graknlabs_dependencies",
        remote = "https://github.com/graknlabs/dependencies",
        commit = "54b40951d3f0c19235693e52ebfb8b988583acdb", # sync-marker: do not remove this comment, this is used for sync-dependencies by @graknlabs_dependencies
    )

def graknlabs_web_infrastructure():
    git_repository(
        name = "graknlabs_web_infrastructure",
        remote = "https://github.com/vaticle/web-infrastructure",
        commit = "510aac828197e5119cffeb099ba682d172e744e6", # sync-marker: do not remove this comment, this is used for sync-dependencies by @graknlabs_dependencies
    )
