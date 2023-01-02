const supertest = require("supertest");
const { dbConnect, dbDisconnect } = require("../utils/db");

let spy;
let app;

describe("Space", () => {
    beforeAll(async () => {
        dbConnect();
        const AuthService = require("../../services/auth");
        spy = jest.spyOn(AuthService, "authorization");
        app = require("../../app");
    });
    afterAll(async () => dbDisconnect());
    describe("create route", () => {
        describe("given no name was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/space")
                    .send({
                        "info": "Japanese pitch accent is a feature of the Japanese language that distinguishes words by accenting particular morae in most Japanese dialects. This space is for aggregating knowledge about this topic.",
                        "tags": ["japanese", "pronunciation"],
                        "image": "https://www.lucalampariello.com/wp-content/uploads/2020/03/Japanese-Accent-Patterns.jpg"
                    })
                    .expect(400);
            });
        });
    });
});
