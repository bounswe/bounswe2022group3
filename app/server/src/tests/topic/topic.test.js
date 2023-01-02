const supertest = require("supertest");
const { dbConnect, dbDisconnect } = require("../utils/db");

let spy;
let app;

describe("Topic", () => {
    beforeAll(async () => {
        dbConnect();
        const AuthService = require("../../services/auth");
        spy = jest.spyOn(AuthService, "authorization");
        app = require("../../app");
    });
    afterAll(async () => dbDisconnect());
    describe("create route", () => {
        describe("given no space_id was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/topic")
                    .send({
                        "name": "Standard Japanese"
                    })
                    .expect(400);
            });
        });
    });
});
