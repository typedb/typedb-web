# GRAKN AI Website
Following is an overhaul of the existing website. The project has been divided into the website and documentation.
## Dependencies
``` npm i ```

## Development
To start a development server (Just for the website)
``` npm run start ``` 
this starts the website server at port : 8080
To Start the documentation server (You can't modify documentation directly here, this is just for deployment)
``` npm build:documentation```
``` node server-docs.js ```
this starts the docs server at port :3002

## Production
To build the documentation pages and the website
```npm run build ```
The deployment of the documentation and the website happens on two different servers - this is so they can exist as parallel entities with the former being redirected to a *docs.grakn.ai/* subdomain.
``` npm run production``` 