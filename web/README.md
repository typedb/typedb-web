# Vaticle Main Website Pages

The pages are built using [React.js](https://reactjs.org/).

These instructions are for setting up a local development environment for the website pages. This is the fastest way to develop the page content. If you want a back-end server running, see `server/README.md`.

### Run local dev server

```shell script
bazel build //...
cd web
yarn start
```


# Vaticle Website Common Library

Contains components used by both the Main Website and the Docs Website.

The common library is built using React.

The Main Website depends on the source files directly and compiles them as part of its regular Webpack build. Other Vaticle-owned websites, such as Docs, depend on the common library as an `npm` package.

### Build npm package

```shell script
cd web/common
./build.sh
```

### Publish npm package

First, set the desired version number in `web/common/build/package.json`, and then run:
```shell script
cd web/common
./publish.sh
```


# Development notes

## SVG styling

If you need to style specific parts of an SVG, use a tool such as `svgr` to first create a React component from the SVG:

```shell script
npm i -g svgr
svgr assets/images/vaticle-atom.svg
```
The component code is outputted to the terminal window and can be copied into a .tsx component file.

Note: If you just want to style the whole SVG, or every element within it, it's often easier to use the raw SVG and a style rule like the following:

```ts
const styles = {
    "svg": {
        "& path": {
            stroke: "#FFF"
        }   
    }
}
```
