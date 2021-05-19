load("@io_bazel_rules_scala//scala:scala.bzl", "scala_library", "scala_binary", "scala_test")
load("@io_bazel_rules_play_routes//play-routes:play-routes.bzl", "play_routes")
load("@vaticle_dependencies//distribution:deployment.bzl", "deployment")
load("@vaticle_dependencies//distribution/maven:version.bzl", "version")
load("@vaticle_dependencies//library/maven:artifacts.bzl", "artifacts")
load("@vaticle_bazel_distribution//maven:rules.bzl", "assemble_maven", "deploy_maven")

assemble_maven(
    name = "assemble-maven",
    target = ":server-lib",
    version_overrides = version(artifacts_org = artifacts),
    workspace_refs = "@vaticle_web_main_workspace_refs//:refs.json"
)

deploy_maven(
    name = "deploy-maven",
    target = ":assemble-maven",
    snapshot = deployment["maven.snapshot"],
    release = deployment["maven.release"],
)

java_binary(
    name = "server-bin",
    main_class = "com.vaticle.web.main.server.Server",
    runtime_deps = [":server-lib"],
    visibility = ["//visibility:public"],
)

java_library(
    name = "server-lib",
    srcs = glob(["*.java"]),
    deps = [
        ":file-controller",
        ":server-routes-lib",
        "//server/api",
        "@maven//:com_typesafe_akka_akka_actor_typed_2_12",
        "@maven//:com_typesafe_akka_akka_stream_2_12",
        "@maven//:com_typesafe_play_filters_helpers_2_12",
        "@maven//:com_typesafe_play_play_2_12",
        "@maven//:com_typesafe_play_play_server_2_12",
        "@maven//:info_picocli_picocli",
        "@maven//:org_jetbrains_kotlin_kotlin_stdlib_jdk7",
        "@maven//:org_slf4j_slf4j_api",
    ],
    resources = [
        "application.conf",
    ],
    resource_strip_prefix = "server",
    runtime_deps = [
        "@maven//:com_typesafe_play_play_akka_http_server_2_12",
        "@maven//:com_typesafe_play_build_link",
        "@maven//:ch_qos_logback_logback_classic",
    ],
    tags = ["maven_coordinates=com.vaticle.typedb:server-lib:{pom_version}"],
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
      "//server/api",
      "@maven//:com_typesafe_akka_akka_actor_typed_2_12",
      "@maven//:com_typesafe_play_play_2_12",
      "@maven//:com_typesafe_play_play_guice_2_12",
      "@maven//:com_typesafe_play_play_java_2_12",
      "@maven//:com_typesafe_play_play_server_2_12",
      "@maven//:com_typesafe_play_twirl_api_2_12",
      "@maven//:javax_inject_javax_inject",
    ],
    tags = ["maven_coordinates=com.vaticle.typedb:server-routes-lib:{pom_version}"],
)
