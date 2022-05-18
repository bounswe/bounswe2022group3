const supertest = require("supertest");
const axios = require("axios");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const mongoose = require("mongoose");
const app = require("../../app");
jest.mock("axios");

describe("Tweets - Managing Rules", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("create_rule route", () => {
        describe("no hashtag was provided", () => {
            it("should return 400 since no hashtag given", async () => {
                await supertest(app).post("/twitterSearch/create_rule").expect(400);
            });
        });
        describe("hashtags must be at least 3 characters long ", () => {
            it("should return 400 due to invalid hashtag", async () => {
                await supertest(app).post("/twitterSearch/create_rule").send({ "hashtag": "tr" }).expect(400);
            });
        });
        describe("Create a rule with a valid request ", () => {
            const randomHashtag = Math.random().toString(36).slice(2, 12); // Get a random word 
            let rule_id;

            it("should return 201 for the first run but 400 for the second since duplicates are not permitted", async () => {
                axios.post.mockResolvedValueOnce({
                    data: {
                        "data": [{ "id": "122333" }],
                        "meta": {
                            "sent": "2022-05-10T12:04:24.755Z",
                            "summary": {
                                "created": 1,
                                "not_created": 0,
                                "valid": 1,
                                "invalid": 0
                            }
                        },
                    },
                });
                const { body, statusCode } = await supertest(app).post("/twitterSearch/create_rule").send({ "hashtag": randomHashtag })

                expect(statusCode).toBe(201)
                expect(body).toHaveProperty("id")
                rule_id = body.id

                axios.post.mockResolvedValueOnce({
                    data: {
                        "meta": {
                            "sent": "2022-05-10T12:04:24.755Z",
                            "summary": {
                                "created": 0,
                                "not_created": 1,
                                "valid": 0,
                                "invalid": 1
                            }
                        },
                    },
                });
                await supertest(app).post("/twitterSearch/create_rule").send({ "hashtag": randomHashtag }).expect(400);
                
                // Delete the created rule
                
                //  Delete endpoint does not cate about the result of the response so it always returns 200.
                axios.post.mockResolvedValueOnce({
                    data: {}
                });
                await supertest(app).get(`/twitterSearch/delete_rule`).query({ id: rule_id }).expect(200);

            });

        });
    });
});
