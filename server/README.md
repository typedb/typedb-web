# Vaticle Website Server

This server was built using [Play Framework](https://www.playframework.com/).

These instructions are for setting up a local development environment for the website server.

### Initialise pages

This step needs to be rerun when the pages are updated.

```shell script
dev/setup-pages.sh
```

### Create the configuration file

```shell script
dev/setup-resources.sh
```

### Run local dev server

```shell script
bazel run //server:server-bin
```

The following executable flags are **required**:
- `--resources`: This should point to the `local/resources` folder in your project root
- `--pages`: This should point to the `local/pages` folder in your project root

### Enabling live reload for the pages

The local dev server does include a binary of the pages and serves them at `http://localhost:8080`, but this is not fast to update.

If you want live reloading on the pages, follow the instructions in `web/README.md` which will set up a Webpack dev server at `http://localhost:4200`. In a local environment, `localhost:4200` is granted permissions to perform API calls to `localhost:8080`.
