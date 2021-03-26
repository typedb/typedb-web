load("@io_bazel_rules_kotlin//kotlin:kotlin.bzl", "kt_jvm_binary", "kt_jvm_library")
load("@io_bazel_rules_play_routes//play-routes:play-routes.bzl", "play_routes")

kt_jvm_binary(
    name = "server",
    main_class = "grakn.web.ServerKt",
    srcs = glob(["*.kt"]),
    deps = [
        ":server-routes-lib",
        "@maven//:com_typesafe_akka_akka_actor_typed_2_12",
        "@maven//:com_typesafe_akka_akka_stream_2_12",
        "@maven//:com_typesafe_play_filters_helpers_2_12",
        "@maven//:com_typesafe_play_play_2_12",
        "@maven//:com_typesafe_play_play_server_2_12",
        "@maven//:org_jetbrains_kotlin_kotlin_stdlib_jdk7",
    ],
    resources = ["application.conf"],
    resource_strip_prefix = "server",
    runtime_deps = [
      "@maven//:com_typesafe_play_play_akka_http_server_2_12",
      "@maven//:com_typesafe_play_build_link"
    ]
)

kt_jvm_library(
  name = "server-routes-lib",
  srcs = [":server-routes-file", "FileController.kt"],
  deps = [
      "@maven//:com_typesafe_akka_akka_actor_typed_2_12",
      "@maven//:com_typesafe_play_play_2_12",
      "@maven//:com_typesafe_play_play_guice_2_12",
      "@maven//:com_typesafe_play_play_java_2_12",
      "@maven//:com_typesafe_play_play_server_2_12",
      "@maven//:com_typesafe_play_twirl_api_2_12",
      "@maven//:com_fasterxml_jackson_core_jackson_databind",
      "@maven//:javax_inject_javax_inject",
    ],
)

play_routes(
  name = "server-routes-file",
  srcs = ["routes"],
  include_play_imports = True,
  generate_reverse_router = True,
)
