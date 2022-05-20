const supertest = require("supertest");
const axios = require("axios");
const { dbConnect, dbDisconnect } = require("../utils/db");
const { User } = require("../models/users/users.model");
let app;
let spy;
let user;
jest.mock("axios");

describe("Movie", () => {
    beforeAll(async () => dbConnect());
    afterAll(async () => dbDisconnect());

    describe("add route", () => {
        describe("if no title is provided", () => {
            it("should return 400", async () => {
                await supertest(app)
                .post("/movies/add")
                .expect(400);
            });
        });
    });

    describe("results route", () => {
        describe("if no keyword is provided", () => {
            it("should return 400", async () => {
                await supertest(app)
                .post("/movies/results")
                .expect(400);
            });
        });

        describe("if there are no matching movies", () => {
            it("should return 404", async () => {
                await supertest(app).
                post("/movies/add?title=Jack+Reachers")
            })
        })
    });
})