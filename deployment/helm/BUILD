load("@com_github_masmovil_bazel_rules//helm:helm.bzl", "helm_chart", "helm_push")
load("//:deployment.bzl", "deployment")

helm_chart(
    name = "distribution",
    package_name = "typedb-web",
    srcs = glob(["**"]),
    helm_chart_version = "{version}",
    image_tag = "{version}",
    image_repository = "{}/{}".format(deployment["docker.organisation"], deployment["docker.release-repository"]),
    visibility = ["//visibility:public"],
    tags = ["manual", "no-ide"],
)

#helm_chart(
#    name = "distribution-snapshot",
#    package_name = "typedb-web",
#    srcs = glob(["**"]),
#    helm_chart_version = "{snapshot-version}",
#    image_tag = "{snapshot-version}",
#    image_repository = "{}/{}".format(deployment["docker.organisation"], deployment["docker.snapshot-repository"]),
#    visibility = ["//visibility:public"],
#)

helm_push(
    name = "deploy",
    chart = ":distribution",
    repository_name = "helm",
    repository_url = deployment["helm.release"],
    repository_username = "$DEPLOY_HELM_USERNAME",
    repository_password = "$DEPLOY_HELM_PASSWORD",
    repo_type = "nexus",
    tags = ["manual", "no-ide"],
)

#helm_push(
#    name = "deploy-snapshot",
#    chart = ":distribution-snapshot",
#    repository_name = "helm-snapshot",
#    repository_url = deployment["helm.snapshot"],
#    repository_username = "$DEPLOY_HELM_USERNAME",
#    repository_password = "$DEPLOY_HELM_PASSWORD",
#    repo_type = "nexus",
#)

sh_binary(
    name = "expand_values_template",
    srcs = ["expand-values-template.sh"]
)
