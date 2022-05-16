This is an Express.js project. 

## Getting Started

First, run the development server:

```bash
npm run watch
# or
yarn watch
```

If you cannot run `npm` command install [Node.js](https://nodejs.org/). LTS version is recommended.

The server will run on [http://localhost:5000](http://localhost:5000).

## Models

Models directory contains code that interacts with the database. Directories are usually 
named as table names and contain <table_name>.model.js file. This file contains a Model class which contains function that work with the db. 

## Routes

This directory contains api.js file which connects all routers. Each directory is dedicated to a router. For instance, users is used for userRouter (endpoints which are of form /users/*). Each such directory shall contain three files: `*.controller.js`, `*.route.js`, `*.validate.js`, where the last one is optional. 

### `*.route.js`

This file defines `GET`, `POST`, etc. methods and the route names. If there needs to be validation for payload, additional middelwares are passed after the url: `validate("<validation_case_name>"), handleValidation`. Finally, if the payload passes the validation, the request goes to the function which is exported from the controller.

### `*.controller.js`

This file contains function contains function which are used in the router. These functions interact with the db (by using functions from  `*.model.js`), make calls to external APIs etc. Finally, they return response to the client.

### `*.validate.js`

In order to not to perform validation inside controller functions, payload validation is performed here. `<validation_case_name>`, which are specified in `*.route.js` methods, shall be present in switch case block. In case statements, payload can be verified using functions provided by `express-validator` package.

## Services

This directory contains useful services that can be used in Models or Routes. 

## .env

`.env` file is not included in the git repository for security reasons. You shall create it yourself. Currently, it needs to be in this form:

```
API_PORT=5000

FRONTEND_URL=http://localhost:3001
LICHESS_TOKEN=<LICHESS_TOKEN>

DB_PORT=<database_port> # (i.e. 5432)
DB_USER=<database_user> # (i.e. postgres)
DB_HOST=<database_host> # (i.e. localhost)
DB_NAME=<database_name>
DB_PASSWORD=<database_password>
```
