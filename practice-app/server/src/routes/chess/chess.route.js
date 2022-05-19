const express = require("express");
const { validate } = require("./chess.validate");
const { handleValidation } = require("../../services/validate");
const { authorization } = require("../../services/auth");
const ChessController = require("./chess.controller");

const chessRouter = express.Router();

/**
 * @swagger
 * /chess/create_game:
 *   post:
 *     summary: Create a Chess game against the Lichess AI
 *     tags: [Chess]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     security:
 *           - bearerAuth: []
 *     requestBody:
 *        description: "Shall contain difficulty and color"
 *        required: true
 *        content:
 *           application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   difficulty:
 *                      type: integer
 *                      minimum: 1
 *                      maximum: 8
 *                      description: AI Strength
 *                   color:
 *                      type: string
 *                      enum: ["random", "white", "black"]
 *                      description: Color of the Player
 *     responses:
 *       "200":
 *         description: Created a new Chess game
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      game_id:
 *                          type: string
 *                      player_color:
 *                          type: string
 *                  example:
 *                      game_id: "46trygjfgu"
 *                      player_color: "white"
 *       "400":
 *         content:
 *           application/json:
 *             schema:
 *                  oneOf:
 *                     - type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                       example:
 *                            message: "difficulty is incorrect or not provided"
 *                     - type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                       example:
 *                            message: "color is incorrect or not provided"
 *                     - type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                       example:
 *                            message: "Could not initiate a game against the AI"
 */
chessRouter.post(
    "/create_game",
    validate("create_game"),
    handleValidation,
    authorization,
    ChessController.createGame
);

/**
 * @swagger
 * /chess/make_move:
 *   post:
 *     summary: Make move in a Chess game
 *     tags: [Chess]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     security:
 *           - bearerAuth: []
 *     requestBody:
 *        description: "Shall contain gameId and moveStr"
 *        required: true
 *        content:
 *           application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   gameId:
 *                      type: string
 *                      description: Game Id
 *                   moveStr:
 *                      type: string
 *                      description: The move to play, in UCI format
 *     responses:
 *       "200":
 *         description: Successfully, made move in the game
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      ok:
 *                          type: boolean
 *                  example:
 *                      ok: true
 *       "400":
 *         content:
 *           application/json:
 *             schema:
 *                  oneOf:
 *                     - type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                       example:
 *                            message: "gameId is not provided"
 *                     - type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                       example:
 *                            message: "moveStr is not provided"
 *                     - type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                       example:
 *                            message: "Could not make the move."
 *       "404":
 *         description: Game not found or does not belong to the user
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Game not found."
 */
chessRouter.post(
    "/make_move",
    validate("make_move"),
    handleValidation,
    authorization,
    ChessController.makeMove
);

/**
 * @swagger
 * /chess/stream_game/:gameId:
 *   get:
 *     summary: Streams events in a Chess Game
 *     tags: [Chess]
 *     produces:
 *       - "application/json"
 *     security:
 *           - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: gameId
 *        description: "game_id of a started chess game"
 *        required: true
 *        schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successfully started stream
 *         content:
 *           application/json:
 *             schema:
 *                  oneOf:
 *                     - type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                       example:
 *                            message: "gameId is not provided"
 *                     - type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                       example:
 *                            message: "moveStr is not provided"
 *                     - type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                       example:
 *                            message: "Could not make the move."
 *       "500":
 *         description: There was an error while piping stream from Lichess API
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Cannot not stream the game."
 */
chessRouter.get(
    "/stream_game/:gameId",
    authorization,
    ChessController.streamGame
);

/**
 * @swagger
 * /chess/games:
 *   get:
 *     summary: Get list of games created by the user
 *     tags: [Chess]
 *     produces:
 *       - "application/json"
 *     security:
 *           - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Successfully, retrieved games of the user
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      games:
 *                         type: array
 *                         items:
 *                             properties:
 *                                 game_id:
 *                                     type: string
 *                                 createdAt:
 *                                     type: Date
 *                                 player_color:
 *                                     type: string
 *                                 winner_color:
 *                                      type: string
 *                                 status:
 *                                      type: string
 *                  example:
 *                      games: [{
 *                            game_id: "756bhghru", 
 *                            player_color: "white",
 *                            winner_color: "white",
 *                            status: "mate",
 *                            createdAt: "2022-05-17T07:10:08.039Z",
 *                      }]
 *       "500":
 *         description: There was an error while retrieving games
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Could not retrieve games."
 */
chessRouter.get("/games", authorization, ChessController.getGames);

/**
 * @swagger
 * /chess/games/:gameId:
 *   get:
 *     summary: Get data of the game
 *     tags: [Chess]
 *     produces:
 *       - "application/json"
 *     security:
 *           - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: gameId
 *        description: "game_id of a chess game"
 *        required: true
 *        schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successfully, retrieved the game
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                     player_color:
 *                        type: string
 *                     moves:
 *                        type: string
 *                  example:
 *                      game: {
 *                            player_color: "white",
 *                            moves: "e2e4 e7e5"
 *                      }
 *       "404":
 *         description: Game does not exist
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Game not found."
 *       "500":
 *         description: There was an error while retrieving the game
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Could not retrieve game."
 */
chessRouter.get("/game/:gameId", authorization, ChessController.getGame);

module.exports = chessRouter;
