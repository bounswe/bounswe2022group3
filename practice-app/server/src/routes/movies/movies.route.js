const express = require("express");
const { validate } = require("./movies.validate");
const { handleValidation } = require("../../services/validate");
const MovieController = require("./movies.controller");

const movieRouter = express.Router();

/**
 * @swagger
 * /movies/list:
 *   get:
 *     summary: Get Watchlist
 *     tags: [Movie]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *      - in: "query"
 *        name: "email"
 *        description: "Email of the user whose watchlist to be fetched"
 *        required: true
 *        type: "string"
 *     responses:
 *       "200":
 *         description: Watchlist returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  watchlist:
 *                      type: any[]
 *       "410":
 *         description: The list is not available anymore.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                      type: string
 *               example:
 *                  error: "Resource not available."
 */
movieRouter.get(
    "/list",
    validate("list"),
    handleValidation,
    MovieController.list
);

/**
 * @swagger
 * /movies/add:
 *   post:
 *     summary: Add movie to watchlist
 *     tags: [Movie]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *      - in: "query"
 *        name: "email"
 *        description: "Email of the user whose watchlist to be fed with the movie record"
 *        required: true
 *        type: "string"
 *      - in: "query"
 *        name: "title"
 *        description: "Title of the movie to be added to the watchlist"
 *        required: true
 *        type: "string"
 *     responses:
 *       "201":
 *         description: Movie added to the watchlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *               example:
 *                  error: "Search successful."
 *       "404":
 *         description: The title did not return anything.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *               example:
 *                  error: "No such movie."
 */
movieRouter.post(
    "/add",
    validate("add"),
    handleValidation,
    MovieController.add
);

/**
 * @swagger
 * /movies/results:
 *   get:
 *     summary: Get matching results
 *     tags: [Movie]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *      - in: "query"
 *        name: "keyword"
 *        description: "Search keyword"
 *        required: true
 *        type: "string"
 *     responses:
 *       "200":
 *         description: Search successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  results:
 *                      type: any[]
 *       "400":
 *         description: The request did not go through.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                      type: string
 *               example:
 *                  error: "The search failed."
 */
movieRouter.get(
    "/results",
    validate("results"),
    handleValidation,
    MovieController.results
)

module.exports = movieRouter;
