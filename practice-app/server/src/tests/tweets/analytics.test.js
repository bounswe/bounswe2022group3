const supertest = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const mongoose = require("mongoose");
const app = require("../../app");


describe("Tweets - Managing Rules", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("Trigger listening for tweets", () => {
        it("should return 200", async () => {
            await supertest(app).get("/twitterSearch/listen").expect(200);
        });
    });
    describe("get_tweets: Get Analytics", () => {
        it("should return 200", async () => {
            const tags = (await supertest(app).get("/twitterSearch/rules")).body

            const { body, statusCode } = await supertest(app).post("/twitterSearch/get_tweets").send({ tags });
           
            expect(statusCode).toBe(200)
            expect(body).toHaveProperty("tags")
            expect(body).toHaveProperty("averageWordCounts")
            expect(body.averageWordCounts).toHaveLength(10)
            expect(body).toHaveProperty("averageLengths")
            expect(body.averageLengths).toHaveLength(10)
        });
    });

});
