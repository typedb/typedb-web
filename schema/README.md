# Main Site Content Model

This module contains the main site "schema": the definitions of the content model that make up our Angular website data,
and their respective representations in our CMS, Sanity.

Each (non-index) file contains both the Sanity and Angular representations of one or more content types.

The [root index file](./index.ts) exports all the TypeScript objects that are needed by either the Sanity configuration
file or the Angular frontend code.

In order to compile either Sanity or Angular, you'll need to install the `npm` dependencies of the schema via:
```shell
pnpm i
```
