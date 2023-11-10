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

### Update a document's ID

Updating a document's ID is non-trivial. The most straightforward way to do it is:
```shell
sanity documents get {CURRENT_ID} > data.json
```
Then update `data.json` to use the new ID. Then:
```shell
sanity documents create data.json
sanity documents delete {CURRENT_ID}
rm -f data.json
```
