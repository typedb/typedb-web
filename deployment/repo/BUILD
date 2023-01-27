load("@io_bazel_rules_kotlin//kotlin:jvm.bzl", "kt_jvm_library")

kt_jvm_library(
    name = "github-token-jar",
    srcs = ["GithubToken.kt"],
    visibility = ["//visibility:public"]
)

kt_jvm_library(
    name = "update-jar",
    srcs = [
        "DeploymentRepo.kt",
        "HelmValues.kt",
        "GithubToken.kt",
        "Update.kt",
    ],
    data = glob(["template/**/*"]),
    deps = [
        "@vaticle_bazel_distribution//common",
        "@vaticle_bazel_distribution//common/shell",
        "@maven//:org_zeroturnaround_zt_exec",
        "@maven//:commons_io_commons_io",
        "@maven//:info_picocli_picocli",
    ],
    visibility = ["//visibility:private"],
)

java_binary(
    name = "update",
    runtime_deps = ["update-jar"],
    main_class = "com.vaticle.typedb.web.deployment.repo.UpdateKt",
    visibility = ["//visibility:public"],
)

kt_jvm_library(
    name = "delete-branch-jar",
    srcs = [
        "DeploymentRepo.kt",
        "HelmValues.kt",
        "GithubToken.kt",
        "DeleteBranch.kt",
    ],
    data = glob(["template/**/*"]),
    deps = [
        "@vaticle_bazel_distribution//common",
        "@vaticle_bazel_distribution//common/shell",
        "@maven//:org_zeroturnaround_zt_exec",
        "@maven//:commons_io_commons_io",
        "@maven//:info_picocli_picocli",
    ],
    visibility = ["//visibility:private"],
)

java_binary(
    name = "delete-branch",
    runtime_deps = ["delete-branch-jar"],
    main_class = "com.vaticle.typedb.web.deployment.repo.DeleteBranchKt",
    visibility = ["//visibility:public"],
)
