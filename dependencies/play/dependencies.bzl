load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def rules_scala_dependencies():
    http_archive(
        name = "bazel_skylib",
        type = "tar.gz",
        url = "https://github.com/bazelbuild/bazel-skylib/releases/download/0.8.0/bazel-skylib.0.8.0.tar.gz",
        sha256 = "2ef429f5d7ce7111263289644d233707dba35e39696377ebab8b0bc701f7818e",
    )

    http_archive(
        name = "io_bazel_rules_scala",
        strip_prefix = "rules_scala-a2f5852902f5b9f0302c727eead52ca2c7b6c3e2",
        type = "zip",
        url = "https://github.com/bazelbuild/rules_scala/archive/a2f5852902f5b9f0302c727eead52ca2c7b6c3e2.zip",
        sha256 = "8c48283aeb70e7165af48191b0e39b7434b0368718709d1bced5c3781787d8e7",
    )

    http_archive(
        name = "com_google_protobuf",
        url = "https://github.com/protocolbuffers/protobuf/archive/v3.11.3.tar.gz",
        strip_prefix = "protobuf-3.11.3",
        sha256 = "cf754718b0aa945b00550ed7962ddc167167bd922b842199eeb6505e6f344852",
    )

def rules_play_routes_dependencies():
    http_archive(
      name = "io_bazel_rules_play_routes",
      sha256 = "e796b668d45ca90dac90bf0a29cac4455795fb3050ff4b03c0f5cac769ade10b",
      strip_prefix = "rules_play_routes-61bd14ffbe06e51239c1895612806abc7267fe63",
      type = "zip",
      url = "https://github.com/lucidsoftware/rules_play_routes/archive/61bd14ffbe06e51239c1895612806abc7267fe63.zip",
    )

    http_archive(
        name = "rules_jvm_external",
        sha256 = "e5b97a31a3e8feed91636f42e19b11c49487b85e5de2f387c999ea14d77c7f45",
        strip_prefix = "rules_jvm_external-2.9",
        type = "zip",
        url = "https://github.com/bazelbuild/rules_jvm_external/archive/2.9.zip",
    )
