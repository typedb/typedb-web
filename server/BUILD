load("@io_bazel_rules_kotlin//kotlin:kotlin.bzl", "kt_jvm_binary")

kt_jvm_binary(
    name = "server",
    main_class = "grakn.web.ServerKt",
    srcs = glob(["*.kt"]),
    deps = [
        "@maven//:org_jetbrains_kotlin_kotlin_stdlib_jdk7",
    ],
)
