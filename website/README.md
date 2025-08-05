# TypeDB Website Frontend - Angular

TypeDB Website is built on [Angular](https://angular.dev).

Its pages can be client-side, server-side, or prerendered according to each environment's needs.

## Build from source

There is a wide variety of Web toolchains; the process below is one way to compile TypeDB Website from source.

### Install toolchains and dependencies

First, install [nvm](https://github.com/nvm-sh/nvm) on MacOS or Linux, [nvm-windows](https://github.com/coreybutler/nvm-windows) on Windows. Then:

```sh
nvm install 22.16.0
nvm use 22.16.0
npm install --global corepack@0.17.0
corepack enable
corepack prepare pnpm@10.12.1 --activate
pnpm i -g @angular/cli
pnpm i
```

### Launch local development server (Angular)

```sh
pnpm run start
```

### Other build commands

Launch local SSR server with prerendering:
```sh
pnpm run start:ssr
```

Build web app distribution:
```sh
pnpm build
```

_Instructions are accurate at the time of writing (12 Jul 2025); see [./netlify.toml](./netlify.toml) for the most up-to-date build process that we use in our Netlify CI._


ℹ️ _If you need to develop the content model (CMS model), see the instructions in the
[CMS module README](../sanity/README.md)._

## Deployment - [Netlify](https://www.netlify.com/)

Pushing any feature branch or mainline branch (`development`, `master`, `live`) will trigger a deploy in Netlify.
You can view the status of deploys [here](https://app.netlify.com/sites/typedb/deploys).

### Environments

- Feature branches get deployed as [Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/). If there is a connected GitHub PR, Netlify will make a post in that PR containing a link to the deploy preview environment.
- The `development` branch is deployed to https://development.typedb.com. It renders draft content in Sanity, client-side.
- The `master` branch is deployed to https://master.typedb.com. It renders **published** content in Sanity client-side. This allows you to preview how your content will look in production.
- The `live` branch is deployed to https://typedb.com, the live site. It takes a snapshot of the published content at the time of deployment, prerenders the site using Scully, and publishes it live.

## Resources

- [Angular docs](https://angular.dev)
- [Angular SSR docs](https://angular.dev/guide/ssr)
- [Netlify docs](https://docs.netlify.com/)
