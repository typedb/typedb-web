# GRAKN AI Website
Following is an overhaul of the existing website. The project has been divided into the website and documentation.
## Dependencies
``` npm i ```

## Development
To start a development server (Just for the website)
``` npm run start ``` 

## Production
To build the documentation pages and the website
```npm run buil ```
The deployment of the documentation and the website happens on two different servers - this is so they can exist as parallel entities with the former being redirected to a *docs.grakn.ai/* subdomain.
``` npm run start:prod``` 