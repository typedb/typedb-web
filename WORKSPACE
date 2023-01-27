# TODO: delete unnecessary loads

workspace(name = "vaticle_web_main")

################################
# Load @vaticle_dependencies #
################################

load("//dependencies/vaticle:repositories.bzl", "vaticle_dependencies")
vaticle_dependencies()

load("@vaticle_dependencies//distribution:deps.bzl", "vaticle_bazel_distribution")
vaticle_bazel_distribution()

# Load //builder/java
load("@vaticle_dependencies//builder/java:deps.bzl", java_deps = "deps")
java_deps()

# Load //builder/kotlin
load("@vaticle_dependencies//builder/kotlin:deps.bzl", kotlin_deps = "deps")
kotlin_deps()
load("@io_bazel_rules_kotlin//kotlin:repositories.bzl", "kotlin_repositories")
kotlin_repositories()
load("@io_bazel_rules_kotlin//kotlin:core.bzl", "kt_register_toolchains")
kt_register_toolchains()

# Load //@vaticle_bazel_distribution//common
load("@vaticle_bazel_distribution//common:deps.bzl", "rules_pkg")
rules_pkg()
load("@rules_pkg//:deps.bzl", "rules_pkg_dependencies")
rules_pkg_dependencies()

# Load //distribution/helm
load("@vaticle_dependencies//distribution/helm:deps.bzl", helm_deps = "deps")
helm_deps()

load("@com_github_masmovil_bazel_rules//repositories:repositories.bzl", helm_repositories = "repositories")
helm_repositories()

# Load //builder/rust
#load("@vaticle_dependencies//builder/rust:deps.bzl", rust_deps = "deps")
#rust_deps()
#
#load("@rules_rust//rust:repositories.bzl", "rust_repositories")
#rust_repositories(edition="2021", include_rustc_srcs=True)
#
#load("@vaticle_dependencies//library/crates:crates.bzl", "raze_fetch_remote_crates")
#raze_fetch_remote_crates()

load("@vaticle_dependencies//builder/rust:deps.bzl", rust_deps = "deps")
rust_deps()

load("@rules_rust//rust:repositories.bzl", "rules_rust_dependencies", "rust_register_toolchains")
rules_rust_dependencies()
rust_register_toolchains(include_rustc_srcs = True, edition="2021")

load("@vaticle_dependencies//library/crates:crates.bzl", "fetch_crates")
fetch_crates()
load("@crates//:defs.bzl", "crate_repositories")
crate_repositories()

# Load //distribution/docker
load("@vaticle_dependencies//distribution/docker:deps.bzl", docker_deps = "deps")
docker_deps()

# Load //tool/common
load("@vaticle_dependencies//tool/common:deps.bzl", "vaticle_dependencies_ci_pip",
    vaticle_dependencies_tool_maven_artifacts = "maven_artifacts")
vaticle_dependencies_ci_pip()

############################
# Load @vaticle_web_main #
############################

# Load rules_play_routes()
#load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
#git_repository(
#    name = "io_bazel_skydoc",
#    remote = "https://github.com/vaticle/skydoc.git",
#    branch = "experimental-skydoc-allow-dep-on-bazel-tools",
#)

##########################################################
# Load package.json and pnpm-lock.yaml
##########################################################
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "aspect_rules_js",
    sha256 = "9d80f28eb59df0486cc1e8e82868e97d8167429ea309a7ae96dfac64ff73275b",
    strip_prefix = "rules_js-1.4.0",
    url = "https://github.com/aspect-build/rules_js/archive/refs/tags/v1.4.0.tar.gz",
)

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@rules_nodejs//nodejs:repositories.bzl", "DEFAULT_NODE_VERSION", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = DEFAULT_NODE_VERSION,
)

load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

npm_translate_lock(
    name = "npm",
    pnpm_lock = "//website:pnpm-lock.yaml",
    verify_node_modules_ignored = "//:.bazelignore",
    lifecycle_hooks_exclude = [
        "nice-napi",
    ]
)

load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()

###############
# Load @maven #
###############

load("//dependencies/maven:artifacts.bzl", vaticle_web_main_artifacts = "artifacts")
load("@vaticle_dependencies//library/maven:rules.bzl", "maven")
maven(
    vaticle_web_main_artifacts +
    vaticle_dependencies_tool_maven_artifacts
)
