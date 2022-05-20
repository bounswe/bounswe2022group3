const express = require("express");
const { validate } = require("./coin.validate")
const { handleValidation } = require("../../services/validate");
const CoinController = require("./coin.controller");

const coinRouter = express.Router();

/**
 * @swagger
 * /coin/coinValue:
 *      get:
 *        summary: Get the price of a cryptocurrency in given currency
 *        tags: [Coin]
 *        consumes:
 *          - "application/json"
 *        produces:
 *          - "application/json"
 *        requestBody:
 *           description: "Shall contain coinId and currencyId"
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    type: object
 *                    properties:
 *                       coinId:
 *                           type: string
 *                           enum: ["bitcoin","ethereum","tether","usd-coin","binancecoin","ripple","binance-usd","cardano","solana","dogecoin"]
 *                           description: ID of the cryptocurrency
 *                       currencyId:
 *                           type: string
 *                           enum: ["USD","EUR","GBP","TRY","RUB","CNY","JPY"]
 *                           description: ID of the currency
 *        parameters:
 *           - in: query
 *             name: coinId
 *             required: true
 *             schema:
 *                 type: string
 *             description: ID of the cryptocurrency 
 *           - in: query
 *             name: currencyId
 *             required: true
 *             schema:
 *                 type: string
 *             description: ID of the currency
 *        responses:
 *             "200":
 *                description: Obtained the price of the cryptocurrency
 *                content:
 *                   applicaiton/json:
 *                      schema:
 *                         type: object
 *                         properties:
 *                             value:
 *                                type: float
 *                         example:
 *                             value: 28000
 *             "400":
 *                 description: Failed to obtain the price due to bad request
 *                 content:
 *                    application/json:
 *                       schema:
 *                          type: object
 *                          properties:
 *                             message:
 *                                type: string
 *                          example:
 *                             message: "Invalid coin or currency ID"
 *                   
 */

coinRouter.get(
        "/coinValue",
        validate("coinValue"),
        handleValidation,
        CoinController.coinValue
);

/**
 * @swagger
 * /coin/coinList:
 *     get:
 *        summary: Get the list of last 5 searches
 *        tags: [Coin]
 *        consumes:
 *           - "application/json"
 *        produces:
 *           - "application/json"
 *        responses:
 *            "200":
 *                description: Fetched the values from database successfully
 *                content:
 *                   application/json:
 *                       schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                     coin_id:
 *                                         type: string
 *                                     currency_id:
 *                                         type: string
 *                                     price:
 *                                         type: float
 *                                     date:
 *                                         type: date
 *                                  example:
 *                                     coin_id: "bitcoin"
 *                                     currency_id: "USD"
 *                                     value: 28000
 *                                     date: 1652968979782
 */

coinRouter.get(
        "/coinList",
        CoinController.coinList
);

/**
 * @swagger
 * /coin/coinValue:
 *      post:
 *        summary: Insert the given coin ID, currency ID and its price to the database
 *        tags: [Coin]
 *        consumes:
 *          - "application/json"
 *        produces:
 *          - "application/json"
 *        requestBody:
 *           description: "Shall contain coinId and currencyId"
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    type: object
 *                    properties:
 *                       coinId:
 *                           type: string
 *                           enum: ["bitcoin","ethereum","tether","usd-coin","binancecoin","ripple","binance-usd","cardano","solana","dogecoin"]
 *                           description: ID of the cryptocurrency
 *                       currencyId:
 *                           type: string
 *                           enum: ["USD","EUR","GBP","TRY","RUB","CNY","JPY"]
 *                           description: ID of the currency
 *        parameters:
 *           - in: query
 *             name: coinId
 *             required: true
 *             schema:
 *                 type: string
 *             description: ID of the cryptocurrency 
 *           - in: query
 *             name: currencyId
 *             required: true
 *             schema:
 *                 type: string
 *             description: ID of the currency
 *        responses:
 *             "200":
 *                description: Inserted to database successfully
 *                content:
 *                   applicaiton/json:
 *                      schema:
 *                            type: object
 *                            properties:
 *                                coinId:
 *                                   type: string
 *                                currencyId:
 *                                   type: string
 *                                currentPrice:
 *                                   type: float
 *                                date:
 *                                   type: date
 *                            example:
 *                                 coinId: "bitcoin"
 *                                 currencyId: "USD"
 *                                 currentPrice: 28000
 *                                 date: 1652968979782     
 *             "400":
 *                 content:
 *                    application/json:
 *                       schema:
 *                          type: object
 *                          properties:
 *                             message:
 *                                type: string
 *                          example:
 *                             message: "Invalid coin or currency ID"
 *                   
 */

coinRouter.post(
        "/addCoinHistory",
        validate("addCoinHistory"),
        handleValidation,
        CoinController.addCoinHistory
)

module.exports = coinRouter;