const supertest = require("supertest");
const { User, createUser } = require("../../models/user/user.model");
const { Resource, createResource } = require("../../models/resource/resource.model");
const { getTokensByEmail, createToken } = require("../../models/tokens/tokens.model");
const { dbConnect, dbDisconnect } = require("../utils/db");
var MockDate = require('mockdate');
const auth = require("../../services/auth");
const jwt = require("jsonwebtoken")

let spy;
let spy2;
let spy3;
let app;
/** To mock authorization middleware
 * spy.mockImplementation(async (req, _, next) => {
 *     req.auth = user;
 *     return next();
 * });
 */



describe("Annotation", () => {
    beforeAll(async () => {
        dbConnect();
        const AuthService = require("../../services/auth");
        spy = jest.spyOn(AuthService, "authorization");
        app = require("../../app");
    });
    afterAll(async () => dbDisconnect());
    describe("create route", () => {
        describe("given no target was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/annotation")
                    .send({
                        "type": "Annotation",
                        "body": [
                            {
                                "type": "TextualBody",
                                "value": "How you doing guys?",
                                "purpose": "commenting",
                                "creator": {
                                    "id": "63602664f38b09884fa7acb6",
                                    "name": "Furkan Akkurt"
                                },
                                "created": "2022-12-03T20:22:27.357Z",
                                "modified": "2022-12-03T20:22:27.664Z"
                            }
                        ],
                        "id": "#a2bff624-1036-40a8-bb49-1a48786e0ce7",
                        "resource": "638924a9496fffbae8d8afc5",
                        "@context": "http://www.w3.org/ns/anno.jsonld"
                    })
                    .expect(400);
            });
        });
    });
});
