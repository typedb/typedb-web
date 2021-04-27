load("@io_bazel_rules_scala//scala:scala.bzl", "scala_library", "scala_binary", "scala_test")
load("@io_bazel_rules_play_routes//play-routes:play-routes.bzl", "play_routes")

java_binary(
    name = "server-bin",
    main_class = "grakn.web.server.Server",
    runtime_deps = [":server-lib"],
    visibility = ["//visibility:public"],
)

java_library(
    name = "server-lib",
    srcs = ["Server.java"],
    deps = [
        ":file-controller",
        ":server-routes-lib",
        "@maven//:com_typesafe_akka_akka_actor_typed_2_12",
        "@maven//:com_typesafe_akka_akka_stream_2_12",
        "@maven//:com_typesafe_play_filters_helpers_2_12",
        "@maven//:com_typesafe_play_play_2_12",
        "@maven//:com_typesafe_play_play_server_2_12",
        "@maven//:org_jetbrains_kotlin_kotlin_stdlib_jdk7",
        "@maven//:org_slf4j_slf4j_api",
    ],
    resources = ["application.conf"],
    resource_strip_prefix = "server",
    runtime_deps = [
        "@maven//:com_typesafe_play_play_akka_http_server_2_12",
        "@maven//:com_typesafe_play_build_link",
        "@maven//:ch_qos_logback_logback_classic",
    ]
)

java_library(
    name = "file-controller",
    srcs = ["FileController.java"],
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
  generate_reverse_router = False,
)


scala_library(
  name = "server-routes-lib",
  srcs = [ ":server-routes-file" ],
  deps = [
      ":file-controller",
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
