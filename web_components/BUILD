load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm")
load("@vaticle_bazel_distribution//npm:rules.bzl", "assemble_npm", "deploy_npm")
load("@vaticle_dependencies//distribution:deployment.bzl", "deployment", "deployment_private")
load("@npm//@bazel/typescript:index.bzl", "ts_project")

ts_project(
    name = "components",
    srcs = glob([
        "src/**/*",
    ]),
    tsconfig = "tsconfig.json",
    declaration = True,
    emit_declaration_only = True,
    deps = [
        "@npm//@fortawesome/free-brands-svg-icons",
        "@npm//@fortawesome/pro-solid-svg-icons",
        "@npm//@fortawesome/react-fontawesome",
        "@npm//@material-ui/core",
        "@npm//@types/color",
        "@npm//@types/d3",
        "@npm//@types/prismjs",
        "@npm//@types/react",
        "@npm//@types/react-router-dom",
        "@npm//clsx",
        "@npm//color",
        "@npm//d3",
        "@npm//interactjs",
        "@npm//pixi-viewport",
        "@npm//pixi.js",
        "@npm//prismjs",
        "@npm//react",
        "@npm//react-animated-burgers",
        "@npm//react-router-dom",
    ],
)

pkg_npm(
    name = "package-npm",
    srcs = ["package.json"],
    deps = [":components"],
)

assemble_npm(
    name = "assemble-npm",
    target = ":package-npm",
)

deploy_npm(
    name = "deploy-npm",
    target = ":assemble-npm",
    snapshot = deployment["npm.snapshot"],
    release = deployment_private["npm.release"],
)
