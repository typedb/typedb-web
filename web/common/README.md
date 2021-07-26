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
