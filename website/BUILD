load("@npm//:defs.bzl", "npm_link_all_packages")
load("@npm//website:@angular/cli/package_json.bzl", angular_cli_bin = "bin")

exports_files([
    "package.json",
    "pnpm-lock.yaml",
])

filegroup(
    name = "srcs",
    srcs = glob(
        [
            "scully/**/*",
            "src/**/*",
            "*",
        ],
        exclude = [
            "BUILD",
            "src/service/credentials/**/*",
        ],
    ),
    visibility = ["//:__subpackages__"],
)

npm_link_all_packages(
    name = "node_modules",
)

APPLICATION_DEPS = [
    ":node_modules/@angular/animations",
    ":node_modules/@angular/cdk",
    ":node_modules/@angular/common",
    ":node_modules/@angular/compiler",
    ":node_modules/@angular/core",
    ":node_modules/@angular/forms",
    ":node_modules/@angular/material",
    ":node_modules/@angular/platform-browser",
    ":node_modules/@angular/platform-browser-dynamic",
    ":node_modules/@angular/router",
    ":node_modules/@scullyio/ng-lib",
    ":node_modules/@scullyio/scully",
    ":node_modules/@scullyio/scully-plugin-puppeteer",
    ":node_modules/@types/d3-force",
    ":node_modules/@types/prismjs",
    ":node_modules/d3-force",
    ":node_modules/fontfaceobserver",
    ":node_modules/interactjs",
    ":node_modules/pixi.js-legacy",
    ":node_modules/prismjs",
    ":node_modules/rxjs",
    ":node_modules/typedb-web-schema",
    ":node_modules/zone.js",
    ":node_modules/@angular-devkit/architect-cli",
    ":node_modules/@angular-devkit/build-angular",
    ":node_modules/@angular/cli",
    ":node_modules/@angular/compiler-cli",
    ":node_modules/@types/jasmine",
    ":node_modules/@types/react",
    ":node_modules/jasmine-core",
    ":node_modules/karma",
    ":node_modules/karma-chrome-launcher",
    ":node_modules/karma-coverage",
    ":node_modules/karma-jasmine",
    ":node_modules/karma-jasmine-html-reporter",
    ":node_modules/react",
    ":node_modules/tslib",
    ":node_modules/typescript",
    ":node_modules/@sanity/icons",
    ":node_modules/@sanity/types",
    ":node_modules/@types/node",
]

angular_cli_bin.ng(
    name = "distribution",
    srcs = [":srcs"] + APPLICATION_DEPS,
    args = ["build", "-c", "development"],
    chdir = package_name(),
    log_level = "debug",
    out_dirs = ["dist/dynamic"],
    visibility = ["//visibility:public"],
)

#load("@npm//website:@angular/compiler-cli/package_json.bzl", compiler_cli = "bin")
#compiler_cli.ngc_binary(name = "ngc")
#
#load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
#ts_project(
#    name = "distribution",
#    tsc = ":ngc",
#    supports_workers = False,
#    srcs = [":srcs"] + APPLICATION_DEPS,
#    args = ["build", "-c", "development"],
#    visibility = ["//visibility:public"],
#)
