load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm")
load("@vaticle_bazel_distribution//npm:rules.bzl", "assemble_npm", "deploy_npm")
load("@vaticle_dependencies//distribution:deployment.bzl", "deployment", "deployment_private")

pkg_npm(
    name = "npm-package",
    srcs = ["package.json"],
    deps = glob(["**/*"], exclude=["BUILD"]),
)

assemble_npm(
    name = "assemble-npm",
    target = ":npm-package",
)

deploy_npm(
    name = "deploy-npm",
    target = ":assemble-npm",
    snapshot = deployment["npm.snapshot"],
    release = deployment_private["npm.release"],
)
