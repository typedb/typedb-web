# Grakn's website repo

This is the repo for GRAKN.AI website located at [https://grakn.ai](https://grakn.ai).

## Installation

```sh
npm install
```

## Build website pages

You can build the public directory using Gulp. This builds the website but NOT the documentation.

```sh
gulp

// Probably you'll have to install gulp globally first
npm install gulp -g
```

## Build and deploy documentation

* To update the documentation, pull the latest version of the website. 
* In a **separate terminal window** to the one you use to `rake serve` and build the docs repo:

```
./build.sh 
cd public
ws
```

This pulls the latest docs repo and builds it. 

* Browse to [user].local:8000/pages/index.html to see the docs you've just built.
* When you're happy - just push everything up to the repo again.

* If you're not happy and spot a change necessary in the documentation, you'll need to go back to the `graknlabs/docs` repo and fix it in the markdown there.