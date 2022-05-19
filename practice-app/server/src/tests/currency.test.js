const supertest = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const mongoose = require("mongoose");
const app = require("../app");
const axios = require("axios");
const ChessGame = require("../models/chess/chess.model");
const { dbConnect, dbDisconnect } = require("./utils/db");
jest.mock("axios");


describe("post for all conversion rates", () => {
    it("should return relevant rates", async () => {
        axios.get
            .mockResolvedValueOnce({
                data: {
                    'USD_USD': 1,
                },
            })
            .mockResolvedValueOnce({
                data: {
                    'USD_EUR': 2,
                },
            })
            .mockResolvedValueOnce({
                data: {
                    'USD_JPY': 3,
                },
            })

        const { body, statusCode } = await supertest(app)
            .post("/currency/allConversions")
            .send(
                {
                    'allCurrencies': ["USD", "EUR", "JPY"]
                }
            )

        expect(body).toEqual({
            status: "ok",
            rates: [1, 2, 3]
        });
        expect(statusCode).toBe(200)

        expect(axios.get).toHaveBeenCalledTimes(3)
    })

    it("should return 404 for get request", async () => {
        const { body, statusCode } = await supertest(app)
            .get("/currency/allConversions")

        expect(statusCode).toBe(404)
    })

    it("should return 400 for post request without body parameters", async () => {
        const { body, statusCode } = await supertest(app)
            .post("/currency/allConversions")

        expect(statusCode).toBe(400)
    })

})


describe("get for conversion", () => {
    it("should return converted value", async () => {

        const amount = 10
        const rate = 16

        axios.get
            .mockResolvedValueOnce({
                data: {
                    "USD_TRY": rate,
                },
            })

        const { body, statusCode } = await supertest(app)
            .get(`/currency/getConversion?from=USD&to=TRY&amount=${amount}`)

        expect(body).toEqual({
            status: "ok",
            convertedValue: amount * rate
        });
        expect(statusCode).toBe(200)

        expect(axios.get).toHaveBeenCalledTimes(1)
    })

    it("should return 404 for post request", async () => {
        const { body, statusCode } = await supertest(app)
            .post("/currency/getConversion")

        expect(statusCode).toBe(404)
    })

    it("should return 400 for requests without the query parameters", async () => {
        const { body, statusCode } = await supertest(app)
            .get("/currency/getConversion")

        expect(statusCode).toBe(400)
    })

})