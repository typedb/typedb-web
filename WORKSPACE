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
load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "npm_install")

node_repositories(
    package_json = ["//pages:package.json"],
)

npm_install(
    name = "npm",
    package_json = "//pages:package.json",
    package_lock_json = "//pages:package-lock.json",
)

###############
# Load @maven #
###############
load("@vaticle_dependencies//library/maven:rules.bzl", "maven")
maven(
    vaticle_web_main_artifacts
)

##################################################
# Create @vaticle_typedb_protocol_workspace_refs #
##################################################

load("@vaticle_bazel_distribution//common:rules.bzl", "workspace_refs")
workspace_refs(
    name = "vaticle_web_main_workspace_refs"
)
