const express = require("express");
const { handleValidation } = require("../../services/validate");
const CurrencyController = require("./currency.controller");
const { validate } = require("./currency.validate");

const currencyRouter = express.Router();

currencyRouter.get(
    "/getConversion",
    validate("getConversion"),
    handleValidation,
    CurrencyController.getConversion
);

currencyRouter.post(
    "/allConversions",
    validate("allConversions"),
    handleValidation,
    CurrencyController.allConversions
)


module.exports = currencyRouter;


/**
 * @swagger
 * /currency/allConversions:
 *   post:
 *     summary: All Conversion Rates 
 *     tags: [Currency]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *      - in: "body"
 *        name: "Body"
 *        description: "This endpoint fetches the conversion rates from USD to the given array of currencies."
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *              allCurrencies:
 *                type: array
 *                items:
 *                  type: string
 *          example: {allCurrencies: [USD, EUR, TRY]}
 *                
 *     responses:
 *       "200":
 *         description: Return the rates
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      rates:
 *                          type: array
 *                          items:
 *                              type: number
 *                  example:
 *                      status: ok
 *                      rates: [1, 2, 3]
 *                      
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *                  type: object     
 * 
 * /currency/getConversion?from={from}&to={to}&amount={amount}:
 *   get:
 *     summary: Get Currency Converted 
 *     tags: [Currency]
 *     produces:
 *       - "application/json"
 *     parameters:
 *      - in: query
 *        name: from
 *        description: "Currency to convert from"
 *        required: true
 *      - in: query
 *        name: to
 *        description: "Currency to convert to"
 *        required: true
 *      - in: query
 *        name: amount
 *        description: "Amount of currency to convert"
 *        required: true
 *     responses:
 *       "200":
 *         description: Return the converted value
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      convertedValue:
 *                          type: number
 *                  example:
 *                      status: ok
 *                      convertedValue: 156.125
 *                      
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *                  type: object         
 */

