// const supertest = require("supertest");
// const { MongoMemoryServer } = require("mongodb-memory-server-core");
// const mongoose = require("mongoose");
// const app = require("../app");
// const axios = require("axios");
// const ChessGame = require("../models/chess/chess.model");
// const {User} = require("../models/users/users.model");
// const { dbConnect, dbDisconnect } = require("utils/db");
// jest.mock("axios");

const supertest = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const mongoose = require("mongoose");
const app = require("../app");
const axios = require("axios");
const { Email } = require("../models/verify/verify.model");
const { dbConnect, dbDisconnect } = require("./utils/db");
jest.mock("axios");



describe("Verify Email", () => {
    beforeAll(async () => dbConnect());
    describe("Verifying email", () => {
        describe("no email was provided", () => {
            it("should return a 400", async () => {
                axios.get
                await supertest(app)
                    .post("/verify/verifyEmail")
                    .expect(400);
            });
        });

        describe("email was provided", () => {
            it("should return a 200 with correct response", async () => {
                axios.get.mockResolvedValueOnce({

                    // "data": {
                    // "status": "success",
                    "data": {
                        "ok": {
                            "status": "success",
                            "data": {
                                "email_address": "beng@gmail.com",
                                "domain": "gmail.com",
                                "valid_syntax": true,
                                "disposable": false,
                                "webmail": true,
                                "deliverable": false,
                                "catch_all": false,
                                "gibberish": false,
                                "spam": false
                            }
                        }
                    }
                    // }
                }
                );
                const { body, statusCode } = await supertest(app)
                    .post("/verify/verifyEmail")
                    .send({
                        "email": "beng@gmail.com"
                    });
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    "ok": {
                        "ok": {
                            "status": "success",
                            "data": {
                                "email_address": "beng@gmail.com",
                                "domain": "gmail.com",
                                "valid_syntax": true,
                                "disposable": false,
                                "webmail": true,
                                "deliverable": false,
                                "catch_all": false,
                                "gibberish": false,
                                "spam": false
                            }
                        }
                    }
                });

            });
        });


        describe("Save email", () => {
            describe("no email was provided", () => {
                it("should return a 400", async () => {
                    await supertest(app)
                        .post("/verify/saveEmail")
                        .expect(400);
                });
            });

            describe("correct email was provided", () => {
                it("should return a 201", async () => {
                    const { body, statusCode } = await supertest(app)
                        .post("/verify/saveEmail")
                        .send({
                            email: "beng@gmail.com"
                        });
                    expect(statusCode).toBe(201);
                    expect(body).toEqual({
                        email: "beng@gmail.com"
                    });
                });
            });

            describe("given already existing user was provided", () => {
                it("should return a 409", async () => {
                    const { body, statusCode } = await supertest(app)
                        .post("/verify/saveEmail")
                        .send({
                            email: "beng@gmail.com",
                        });
                    expect(statusCode).toBe(409);
                    expect(body).toEqual({
                        "message": "email already exist."
                    });
                });
            });
        });

        describe("Get emails", () => {
            describe("successfully retrieve emails", () => {
                it("should return a 200 with correct response", async () => {
                    const { body, statusCode } = await supertest(app)
                        .get("/verify/getEmails");
                    expect(statusCode).toBe(200);
                    expect(body.emails.length).toEqual(1);
                    expect(body.emails[0].__v).toEqual(0);
                    expect(body.emails[0].email).toEqual('beng@gmail.com');
                    expect(body.emails[0]._id).toEqual(expect.any(String));
     
                });
            });

            describe("could not retrieve emails", () => {
                it("should return a 500", async () => {
                    await dbDisconnect();
                    const { body, statusCode } = await supertest(app)
                        .get("/verify/getEmails");
                    expect(statusCode).toBe(500);
                    expect(body).toEqual({
                        "message": "Could not retrieve emails."
                    });
                });
            });



        });
    });
});