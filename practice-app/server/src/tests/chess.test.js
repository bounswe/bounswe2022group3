const supertest = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const mongoose = require("mongoose");
const app = require("../app");

describe("Chess", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("create_game route", () => {
        describe("given no difficulty was provided", () => {
            it("should return a 400", async () => {
                await supertest(app).post("/chess/create_game").expect(400);
            });
        });
        describe("given no color was provided", () => {
            it("should return a 400", async () => {
                await supertest(app).post("/chess/create_game").expect(400);
            });
        });
        describe("given incorrect difficulty was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/chess/create_game")
                    .send({
                        difficulty: 10,
                        color: "white",
                    })
                    .expect(400);
            });
        });
        describe("given incorrect color was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/chess/create_game")
                    .send({
                        difficulty: 1,
                        color: "",
                    })
                    .expect(400);
            });
        });
        describe("given correct body was provided", () => {
            it("should return a 200 with correct response", async () => {
                const { body, statusCode } = await supertest(app)
                    .post("/chess/create_game")
                    .send({
                        difficulty: 1,
                        color: "white",
                    });

                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    game_id: expect.any(String),
                    player_color: "white",
                });
            });
        });
    });
});
