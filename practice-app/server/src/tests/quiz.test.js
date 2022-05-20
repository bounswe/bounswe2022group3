const supertest = require("supertest");
const axios = require("axios");
const { dbConnect, dbDisconnect } = require("./utils/db");
const { User } = require("../models/users/users.model");
let app;
let spy;
let user;
jest.mock("axios");


describe("Quiz", () => {
    beforeAll(async () => {
        dbConnect();
        user = await User.create({
            client_id: "74EQuuHnACLWcjAG53sMsz9F52Z34oo0",
            tenant: "dev-mh-acvm7",
            email: "example@example.com",
            password:
                "$2b$10$iiQm9KRyIn7t9RKLO8da2.P18CXsn6GByjN3xXtmw9rLaRcH74qLO",
            connection: "Username-Password-Authentication",
            given_name: "john",
            family_name: "doe",
        });
        const AuthService = require("../services/auth");
        spy = jest.spyOn(AuthService, "authorization");
        app = require("../app");
    });
    afterAll(async () => dbDisconnect());

    describe("categories route", () => {
        describe("Database has category info", () => {
            it("should return a 200 with correct response", async () => {
                const { body, statusCode } = await supertest(app).get(
                    "/quiz/categories"
                );

                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    game: [
                        {
                            category_id: expect.any(String),
                            name: expect.any(String),
                        },
                    ],
                });
            })
        })
    })

    describe("new_quiz route", () => {
        describe("given no body was provided", () => {
            it("should return a 400", async () => {
                await supertest(app).post("/quiz/new_quiz").expect(400);
            });
        });
        describe("given incorrect categories was provided", () => {
            it("should return a 500", async () => {
                await (await supertest(app).post("/quiz/new_quiz")).send({
                    categories: {}
                }).expect(500);
            });
        });
        describe("given incorrect _questionCount was provided", () => {
            it("should return a 400", async () => {
                await supertest(app).post("/quiz/new_quiz").send({

                    "categories":
                        [{
                            "_questionCount": "a",
                            "_category": "12"
                        }]

                }).expect(400);
            });
        });
        describe("given incorrect _category was provided", () => {
            it("should return a 400", async () => {
                await supertest(app).post("/quiz/new_quiz").send({

                    "categories":
                        [{
                            "_questionCount": "3",
                            "_category": "xtc"
                        }]

                }).expect(400);
            });
        });

        describe("given incorrect _difficulty was provided", () => {
            it("should return a 400", async () => {
                await supertest(app).post("/quiz/new_quiz").send({

                    "categories":
                        [{
                            "_questionCount": "a",
                            "_category": "12"
                        },
                        {
                            "_difficulty": "mediocre"
                        }]

                }).expect(400);
            });

        });

        describe("given questions api returned response-code 1", () => {
            it("should return a 404", async () => {
                await supertest(app).post("/quiz/new_quiz").send({
                    "categories": [{
                        "_questionCount": "a",
                        "_category": "12"
                    }] ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                }).expect(404);
            });
        });
        describe("given questions api returned response-code 1", () => {
            it("should return a 404", async () => {
                await supertest(app).post("/quiz/new_quiz").send({
                    "categories": [{
                        "_questionCount": "a",
                        "_category": "12"
                    }] ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                }).expect(404);
            });
        });

    })
})
