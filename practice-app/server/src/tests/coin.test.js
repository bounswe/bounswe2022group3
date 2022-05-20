const supertest = require("supertest");
const app = require("../app");
const axios = require("axios");
jest.mock("axios");

describe("Cryptocurrency API", () => {

    describe("Get price", () => {
        
        it("Should return 400 for no parameters", async () => {
            const { statusCode } = await supertest(app)
            .get("/coin/coinValue")
            expect(statusCode).toBe(400);
        })

        it("Should return 400 for no coinId", async () => {
            const { statusCode } = await supertest(app)
            .get("/coin/coinValue")
            .query({
                currencyId: "USD"
            })
            expect(statusCode).toBe(400);
        })

        it("Should return 400 for no currencyId", async () => {
            const { statusCode } = await supertest(app)
            .get("/coin/coinValue")
            .query({
                coinId: "bitcoin"
            })
            expect(statusCode).toBe(400);
        })

        it("Should return 400 for invalid coinId and currencyId", async () => {
            const { statusCode } = await supertest(app)
            .get("/coin/coinValue")
            .query({
                coinId: "hello",
                currencyId: "world"
            })
            expect(statusCode).toBe(400);
        })

        it("Should return 200 with correct parameters", async () => {

            axios.get.mockResolvedValueOnce({
                data: {
                    bitcoin: {
                        usd: 28000
                    }
                }
            })

            const { body, statusCode } = await supertest(app)
            .get("/coin/coinValue")
            .query({
                coinId: "bitcoin",
                currencyId: "USD"
            })
            expect(statusCode).toBe(200);
            expect(body.value).toEqual(28000);
        })
    
    })





    describe("Insert price to database", () => {
    
        it("Should return 400 for no parameters", async () => {
            const { statusCode } = await supertest(app)
            .post("/coin/addCoinHistory")
            expect(statusCode).toBe(400);
        })


        it("Should return 400 for no coinId", async () => {
            const { statusCode } = await supertest(app)
            .post("/coin/addCoinHistory")
            .query({
                currencyId: "USD"
            })
            expect(statusCode).toBe(400);
        })

        it("Should return 400 for no currencyId", async () => {
            const { statusCode } = await supertest(app)
            .post("/coin/addCoinHistory")
            .query({
                coinId: "bitcoin"
            })
            expect(statusCode).toBe(400);
        })

        it("Should return 400 for invalid coinId and currencyId", async () => {
            const { statusCode } = await supertest(app)
            .post("/coin/addCoinHistory")
            .query({
                coinId: "hello",
                currencyId: "world"
            })
            expect(statusCode).toBe(400);
        })

        it("Should return 200 for correct parameters", async () => {

            axios.get.mockResolvedValueOnce({
                data: {
                    bitcoin: {
                        usd: 28000
                    }
                }
            })

            const { body, statusCode } = await supertest(app)
            .post("/coin/addCoinHistory")
            .query({
                coinId: "bitcoin",
                currencyId: "USD"
            })

            expect(statusCode).toBe(200)
            expect(body).toEqual({
                coin_id: "bitcoin",
                currency_id: "USD",
                currentPrice: 28000,
                date: expect.anything()
            })

        })

    })
    
})
