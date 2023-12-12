# Content Migration Scripts

Certain schema operations such as renaming fields are non-trivial in Sanity and will result in the data
continuing to exist, but being inaccessible via the Sanity Studio UI. In order to regain access to the data,
we need to run the appropriate migration script.

## Setup

Install the Sanity CLI globally:
```shell
pnpm add --global @sanity/cli@latest
```

Change directory to the `cms` folder to perform migrations.

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
