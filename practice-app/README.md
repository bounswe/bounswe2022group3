# Practice App of Group 3 2022 - CmpE352

## Dependencies

To install dependencies of the project, please go into both `client` and `server` directories and run `npm install` command in both directories. 

If you cannot run `npm` command install [Node.js](https://nodejs.org/). LTS version is recommended.

Then, you can follow instructions provided in `README.md` files in those directories to run development servers for both `client` and `server`.

## Running the project
1. First of all, you need a MongoDB instance. Whether to have authentication or not is your choice. Please copy the MongoDB URI.
2. Create a `.env` file in the `server/src` file. It should contain the following fields:
    ```json
    API_PORT=
    API_URL=

    FRONTEND_URL=

    DB=

    TWITTER_BEARER_TOKEN=

    LICHESS_TOKEN=

    auth0_domain =
    auth0_client_id =
    auth0_clientSecret =
    auth0_audience =
    auth0_connection =

    CURRENCY_API_KEY=

    GENIUS_TOKEN=

    MOVIEDB_TOKEN=

    GOREST_TOKEN=
    ```
    After adding the .env file, you can run `docker-compose up --build -d` in `server/src` folder.
3. Similarly, edit the `next.config.js` folder in `client` folder and update the `API_URL`. Yo do not need any other modifications, just run `docker-compose up --build -d` in `client` folder.\
PS: Note that both server and client docker-compose files server port 80 since we are serving from two EC2 instances. If you are running both of them on the same machine, change at least one of them.\
4. That is all!
