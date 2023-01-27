load("@io_bazel_rules_kotlin//kotlin:jvm.bzl", "kt_jvm_library")

sh_binary(
    name = "rollout_dashboard",
    srcs = ["rollout-dashboard.sh"]
)

kt_jvm_library(
    name = "sync_lib",
    srcs = [
        "ArgoCD.kt",
        "Sync.kt",
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
    name = "sync",
    runtime_deps = ["sync_lib"],
    main_class = "com.vaticle.typedb.web.deployment.argocd.SyncKt",
    visibility = ["//visibility:public"],
)

kt_jvm_library(
    name = "teardown_lib",
    srcs = [
        "ArgoCD.kt",
        "Teardown.kt",
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
    name = "teardown",
    runtime_deps = ["teardown_lib"],
    main_class = "com.vaticle.typedb.web.deployment.argocd.TeardownKt",
    visibility = ["//visibility:public"],
)
