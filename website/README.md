# TypeDB Website Frontend - Angular

The TypeDB website frontend is an Angular app that is client-side rendered locally and in development. In production,
we use [Scully](https://scully.io) to prerender the pages.

## Install dependencies

### Angular CLI

It's common practice to install Angular CLI globally, but local installation may be beneficial if you need to manage
multiple Angular projects on your system that use different major Angular versions.

```shell
pnpm add --global @angular/cli
```

### Node modules
```shell
pnpm i
```

## Develop locally

```shell
ng serve --open
```

ℹ️ _If you need to develop the content model (CMS model), see the instructions in the
[Sanity module README](../sanity/README.md)._

## Deployment - [Netlify](https://www.netlify.com/)

Pushing any feature branch or mainline branch (`development`, `master`, `live`) will trigger a deploy in Netlify.
You can view the status of deploys [here](https://app.netlify.com/sites/typedb/deploys).

### Environments

- Feature branches get deployed as [Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/). If there is a connected GitHub PR, Netlify will make a post in that PR containing a link to the deploy preview environment.
- The `development` branch is deployed to https://development.typedb.com. It renders draft content in Sanity, client-side.
- The `master` branch is deployed to https://master.typedb.com. It renders **published** content in Sanity client-side. This allows you to preview how your content will look in production.
- The `live` branch is deployed to https://typedb.com, the live site. It takes a snapshot of the published content at the time of deployment, prerenders the site using Scully, and publishes it live.

## Prerendering - [Scully](https://scully.io/)

Scully is a prerenderer purpose-built for Angular sites. We use prerendering so that search engine crawlers see the
actual content without needing to run JavaScript, and sharply improves performance for our users by making the initial
page load lightning fast.

### Run Scully locally

The intended result is that the site behaves exactly the same prerendered as it would otherwise. However, it is not
perfect, and it's possible to introduce bugs, e.g. using code that is expected to run exactly once on a page - which
may end up getting run repeatedly (once by the prerenderer, once by the user's browser)

When fixing bugs in Scully or developing features, it can be useful to run it locally:
```shell
OUT_DIR=./dist/static npx scully --project typedb-web --scanRoutes --noPrompt
```

The prerendered site will be built to `./dist/static` where you can browse the artifacts.

## Resources

- [Angular docs](https://angular.io/docs)
- [Scully docs](https://scully.io/docs/learn/overview/)
- [Netlify docs](https://docs.netlify.com/)
