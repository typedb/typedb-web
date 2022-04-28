workspace(name = "vaticle_web_main")

################################
# Load @vaticle_dependencies #
################################

load("//dependencies/vaticle:repositories.bzl", "vaticle_dependencies")
vaticle_dependencies()

# Load //builder/java
load("@vaticle_dependencies//builder/java:deps.bzl", java_deps = "deps")
java_deps()

# Load //builder/kotlin
load("@vaticle_dependencies//builder/kotlin:deps.bzl", kotlin_deps = "deps")
kotlin_deps()
load("@io_bazel_rules_kotlin//kotlin:kotlin.bzl", "kotlin_repositories", "kt_register_toolchains")
kotlin_repositories()
kt_register_toolchains()

# Load //builder/python
load("@vaticle_dependencies//builder/python:deps.bzl", python_deps = "deps")
python_deps()

# Load //tool/common
load("@vaticle_dependencies//tool/common:deps.bzl", "vaticle_dependencies_ci_pip",
    vaticle_dependencies_tool_maven_artifacts = "maven_artifacts")
vaticle_dependencies_ci_pip()

#####################################################################
# Load @vaticle_bazel_distribution from (@vaticle_dependencies) #
#####################################################################

load("@vaticle_dependencies//distribution:deps.bzl", "vaticle_bazel_distribution")
vaticle_bazel_distribution()

load("@vaticle_bazel_distribution//packer:deps.bzl", deploy_packer_dependencies="deps")
deploy_packer_dependencies()

load("@vaticle_bazel_distribution//common:deps.bzl", "rules_pkg")
rules_pkg()

load("@rules_pkg//:deps.bzl", "rules_pkg_dependencies")
rules_pkg_dependencies()

############################
# Load @vaticle_web_main #
############################

load("//dependencies/maven:artifacts.bzl", vaticle_web_main_artifacts = "artifacts")

# Load rules_scala()
load("//dependencies/play:dependencies.bzl", "rules_scala_dependencies")
rules_scala_dependencies()

load("@io_bazel_rules_scala//scala:toolchains.bzl", "scala_register_toolchains")
scala_register_toolchains()

load("@io_bazel_rules_scala//scala:scala.bzl", "scala_repositories")
scala_repositories()

# Load rules_play_routes()
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
git_repository(
    name = "io_bazel_skydoc",
    remote = "https://github.com/vaticle/skydoc.git",
    branch = "experimental-skydoc-allow-dep-on-bazel-tools",
)

load("//dependencies/play:dependencies.bzl", "rules_play_routes_dependencies")
rules_play_routes_dependencies()

load("@io_bazel_rules_play_routes//:workspace.bzl", "play_routes_repositories")
play_routes_repositories("2.7")

load("@play_routes//:defs.bzl", play_routes_pinned_maven_install = "pinned_maven_install")
play_routes_pinned_maven_install()

bind(
  name = "default-play-routes-compiler-cli",
  actual = "@io_bazel_rules_play_routes//default-compiler-clis:scala_2_12_play_2_7"
)

# Load //builder/nodejs
load("@vaticle_dependencies//builder/nodejs:deps.bzl", nodejs_deps = "deps")
nodejs_deps()
load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")

node_repositories(
    package_json = ["//web:package.json"],
)

yarn_install(
    name = "npm",
    package_json = "//web:package.json",
    yarn_lock = "//web:yarn.lock"
)

###############
# Load @maven #
###############
load("@vaticle_dependencies//library/maven:rules.bzl", "maven")
maven(
    vaticle_web_main_artifacts +
    vaticle_dependencies_tool_maven_artifacts
)
