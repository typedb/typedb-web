# Customer.io tooling

```shell
pnpm add --global mjml 
brew install moreutils
```

```shell
mkdir 20240828-cloud-gcp-marketplace && pushd 20240828-cloud-gcp-marketplace && touch index.mjml
mjml --watch index.mjml -o index.html | ts
```
