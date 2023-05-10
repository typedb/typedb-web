# TypeDB Docs Framework

The TypeDB docs subsite is an [Antora playbook](https://antora.org), whose UI bundle sources are in the `ui`
directory, and whose content is sourced from https://github.com/vaticle/docs and integrated as a Git submodule into
the `content` directory.

The UI bundle is based on https://gitlab.com/antora/antora-ui-default.

## Development

These instructions are for compiling the docs site locally.

### Prerequisites

1. Install Bazel
2. Install [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)
3. Run `bazel run //docs:install_deps` to install Node.js, Antora, Gulp and all required `node_modules`

### Build

```shell
bazel run //docs:build
```

The docs site will be built and output to `dist`.

Assuming the build is successful, it will log a file you can open in a browser to view the site.
