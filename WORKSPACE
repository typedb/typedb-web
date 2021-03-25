workspace(name = "graknlabs_web_main")

################################
# Load @graknlabs_dependencies #
################################

load("//dependencies/graknlabs:repositories.bzl", "graknlabs_dependencies")
graknlabs_dependencies()

# Load //builder/java
load("@graknlabs_dependencies//builder/java:deps.bzl", java_deps = "deps")
java_deps()

# Load //builder/kotlin
load("@graknlabs_dependencies//builder/kotlin:deps.bzl", kotlin_deps = "deps")
kotlin_deps()
load("@io_bazel_rules_kotlin//kotlin:kotlin.bzl", "kotlin_repositories", "kt_register_toolchains")
kotlin_repositories()
kt_register_toolchains()

load("//dependencies/maven:artifacts.bzl", graknlabs_web_main_artifacts = "artifacts")

###############
# Load @maven #
###############
load("@graknlabs_dependencies//library/maven:rules.bzl", "maven")
maven(
    graknlabs_web_main_artifacts
)
