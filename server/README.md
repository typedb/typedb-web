# Vaticle Website Server

This server was built using [Play Framework](https://www.playframework.com/).

These instructions are for setting up a local development environment for the website server.

## Initialise pages

This step needs to be rerun when the pages are updated.

```shell script
dev/setup-pages.sh
```

## Create the configuration file

```shell script
dev/setup-resources.sh
```

## Run local dev server

```shell script
bazel run //server:server-bin
```

The following executable flags are **required**:
- `--resources`: This should point to the `local/resources` folder in your project root
- `--pages`: This should point to the `local/pages` folder in your project root
