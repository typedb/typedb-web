# Content Scripts

This folder holds content migration scripts (below) and asset tools such as
[monochrome logos](#monochrome-logos).

## Monochrome logos

Organisation logos on the website (e.g. "Used by ..." rows) share one style: a single neutral grey on a
transparent background. `monochrome-logo.mjs` converts a logo from any source into that style. It runs with plain
Node from the `sanity` folder and needs no Sanity credentials:

```shell
node scripts/monochrome-logo.mjs <file-or-url> --name <slug> --preview
```

It writes `typedb-org-<slug>.png`, `typedb-org-<slug>@2x.png` and a preview on the site's dark background to
`logo-output/`. Upload the `@2x` PNG as the organisation's logo in Studio.

Prefer an official vector source: the organisation's own site (the header `<img>` or inline `<svg>`), or its
Wikidata entry, whose "logo image" property links the official file on Wikimedia Commons. Raster sources and
screenshots work too: zoom in to capture at a high resolution.

| Source looks like | Options |
| --- | --- |
| Logo on a transparent background | none: the image's transparency is used |
| Logo on a solid background (JPEG, screenshot) | none: the background colour is detected from the corners |
| One colour on top of another (white text on a red square, a leaf on a shield) | `--knockout "#ffffff"`: listed colours become holes, instead of everything merging into one shape |
| Has parts to leave out (a tagline, a co-branded block) | `--exclude x0,y0,x1,y1`: a region as fractions of the width and height; repeatable |
| Faint frame line around the edge | `--inset 6`: shaves source pixels from each edge |

The logo row sizes each logo from its shape, so that square marks and long wordmarks look balanced; the
preview shows it at that size. If a logo still looks too small or too large (e.g. a lockup with a lot of empty
space), set the organisation's **Logo size adjustment** in Studio rather than padding the image.

# Content Migration Scripts

Certain schema operations such as renaming fields are non-trivial in Sanity and will result in the data
continuing to exist, but being inaccessible via the Sanity Studio UI. In order to regain access to the data,
we need to run the appropriate migration script.

## Setup

Install the Sanity CLI globally:
```shell
pnpm add --global @sanity/cli@latest
```

Change directory to the `sanity` folder to perform migrations.

## Authentication

In order to run a migration script, you need an access token with **editor** permissions.

After generating the token, create a file named `credentials/token.js` with the following content:
```js
export default "{YOUR_EDITOR_TOKEN}";
```
replacing the templated variable with the appropriate value.

## Scripts

You can run any script in this directory using
```shell
sanity exec scripts/{SCRIPT_NAME}.js
```

### Update a singleton document

One of the most common use cases is updating a type name in the schema. When it's a type that's only used in a small
number of documents (such as singleton documents) the most straightforward way to is:
```shell
sanity documents get {CURRENT_ID} > data.json
```
Then update `data.json` with the changes desired. Then:
```shell
sanity documents create data.json
sanity documents delete {CURRENT_ID}
rm -f data.json
```
