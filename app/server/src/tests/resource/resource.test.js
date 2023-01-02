const supertest = require("supertest");
const { dbConnect, dbDisconnect } = require("../utils/db");

let spy;
let app;

describe("Resource", () => {
    beforeAll(async () => {
        dbConnect();
        const AuthService = require("../../services/auth");
        spy = jest.spyOn(AuthService, "authorization");
        app = require("../../app");
    });
    afterAll(async () => dbDisconnect());
    describe("create route", () => {
        describe("given no topic_id was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/topic")
                    .send({
                        "name": "Scalar pitch",
                        "body": "Words spoken in isolation: If the accent is on the first mora, then the pitch starts high, drops suddenly on the second mora, then levels out. The pitch may fall across both morae, or mostly on one or the other.",
                    })
                    .expect(400);
            });
        });
    });
});
