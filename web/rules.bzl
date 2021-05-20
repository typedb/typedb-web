def _assemble_react_impl(ctx):
    archive = ctx.actions.declare_file("{}.tar.gz".format(ctx.attr.name))
    react_cli_wrapper_dir = str(ctx.attr._react_cli_wrapper_binary.label).replace(':', '/')

    ctx.actions.run_shell(
        inputs = ctx.files.srcs,
        outputs = [archive],
        env = {
          "WEBPACK_CLI_WRAPPER_DIRECTORY": react_cli_wrapper_dir
        },
        command = "cd {} && ../{} --mode {} && tar -cvzf ../{} ./{}".format(
            ctx.attr.package_dir, ctx.executable._react_cli_wrapper_binary.path, ctx.attr.react_build_mode, archive.path, ctx.attr.webpack_output_path),
        tools = [ctx.executable._react_cli_wrapper_binary],
        progress_message = "Running webpack (build) in {}".format(ctx.attr.package_dir),
        mnemonic = "AssembleReact",
        execution_requirements = {
            "local": "1"
        },
    )
    return DefaultInfo(files = depset([archive]))

assemble_react = rule(
    implementation = _assemble_react_impl,
    attrs = {
        "srcs": attr.label_list(
            allow_files = True
        ),
        "package_dir": attr.string(
            default = ".",
            doc = "package directory to run 'webpack (build)' in"
        ),
        "webpack_output_path": attr.string(
            mandatory = True,
            doc = "output path of webpack build"
        ),
        "deps": attr.label_list(
            allow_files = True
        ),
        "react_build_mode": attr.string(
            values = ["development", "production"],
            default = "production"
        ),
        "_react_cli_wrapper_binary": attr.label(
            default = ":webpack_cli_bazel_wrapper",
            executable = True,
            cfg = "host"
        )
    }
)