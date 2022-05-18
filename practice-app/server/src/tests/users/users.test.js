const supertest = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const mongoose = require("mongoose");
const app = require("../../app");
const axios = require("axios");
const ChessGame = require("../../models/chess/chess.model");
const {User} = require("../../models/users/users.model");
const { dbConnect, dbDisconnect } = require("../utils/db");
jest.mock("axios");

describe("User", () => {
    beforeAll(async () => dbConnect());
    afterAll(async () => dbDisconnect());
    describe("register route", () => {
        describe("given no body was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                .post("/users/register")
                .expect(400);
            });
        });
        describe("given no first_name was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/users/register")
                    .send({
                        last_name: "ersoy",
                        email: "ahmet@gmail.com",
                        password: "Password*11",
                    })
                    .expect(400);
            });
        });
        describe("given no last_name was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/users/register")
                    .send({
                        first_name: "ersoy",
                        email: "ahmet@gmail.com",
                        password: "Password*11",
                    })
                    .expect(400);
            });
        });
        describe("given no email was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/users/register")
                    .send({
                        last_name: "ersoy",
                        first_name: "ahmet",
                        password: "Password*11",
                    })
                    .expect(400);
            });
        });
        describe("given no password was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/users/register")
                    .send({
                        last_name: "ersoy",
                        email: "ahmet@gmail.com",
                        first_name: "akadir",
                    })
                    .expect(400);
            });
        });
        describe("given incorrect email was provided", () => {
            it("should return a 400", async () => {
                wrong_emails = ["ahmet","ahmet@","ahmet@gmail","ahmet@gmail.","ahmet@.com","@gmail.com","ahmet.com"]
                for (const wEmail in wrong_emails) {
                    await supertest(app)
                    .post("/users/register")
                    .send({
                        first_name: "ersoy",
                        last_name: "ersoy",
                        email: wrong_emails[wEmail],
                        password: "Password*11",
                    })
                    .expect(400);
                }
            });
        });
        describe("given incorrect password was provided", () => {
            it("should return a 400", async () => {
                wrong_passwords = ["password","Password","password*","password*12","Password11","Password*"]
                for (const i in wrong_passwords) {
                    await supertest(app)
                    .post("/users/register")
                    .send({
                        first_name: "ersoy",
                        last_name: "ersoy",
                        email: "kadir@gmail.com",
                        password: wrong_passwords[i],
                    })
                    .expect(400);
                }
            });
        });
        describe("given correct body was provided", () => {
            it("should return a 201 with correct response", async () => {
                axios.post.mockResolvedValueOnce({
                    data: {
                        access_token: "access_token",
                    },
                });
                axios.post.mockResolvedValueOnce({
                    data: {
                        created_at: "created_at",
                    },
                });

                const { body, statusCode } = await supertest(app)
                    .post("/users/register")
                    .send({
                        first_name: "kadir",
                        last_name: "ersoy",
                        email: "kadir@gmail.com",
                        password: "Password*11",
                    });

                expect(statusCode).toBe(201);
                expect(body).toEqual({
                    created_at: "created_at",
                    message: `Created the user with kadir@gmail.com`,
                });
                const user_test = new User({ client_id:"id",email: 'kadir@gmail.com', given_name:"kadir",family_name:"ersoy",password:"Password*11" });
                user_test.save();
            });
        });
        describe("given already existing user was provided", () => {
            it("should return a 409", async () => {
                axios.post.mockResolvedValueOnce({
                    data: {
                        access_token: "access_token",
                    },
                });
                axios.post.mockRejectedValueOnce({
                    response: {
                        status: 409,
                        data:{
                            statusCode: 409,
                            error: "Conflict",
                            message: 'The user already exists.',
                            errorCode: 'auth0_idp_error' 
                        }
                    }
                });
                const { body, statusCode } = await supertest(app)
                    .post("/users/register")
                    .send({
                        first_name: "ersoy",
                        last_name: "ersoy",
                        email: "kadir@gmail.com",
                        password: "Password*11",
                });
                expect(statusCode).toBe(409);
                expect(body).toEqual({
                    message: "The user already exists.",
                });
            });
        });
    });

    describe("login route", () => {
        describe("given no body was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                .post("/users/login")
                .expect(400);
            });
        });
        describe("given no email was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/users/login")
                    .send({
                        password: "Password*11",
                    })
                    .expect(400);
            });
        });
        describe("given no password was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/users/login")
                    .send({
                        email: "kadir@gmail.com",
                    })
                    .expect(400);
            });
        });
        describe("given incorrect email was provided", () => {
            it("should return a 400", async () => {
                wrong_emails = ["ahmet","ahmet@","ahmet@gmail","ahmet@gmail.","ahmet@.com","@gmail.com","ahmet.com"]
                for (const wEmail in wrong_emails) {
                    await supertest(app)
                    .post("/users/login")
                    .send({
                        email: wrong_emails[wEmail],
                        password: "Password*11",
                    })
                    .expect(400);
                }
            });
        });
        describe("given incorrect password was provided", () => {
            it("should return a 400", async () => {
                wrong_passwords = ["password","Password","password*","password*12","Password11","Password*"]
                for (const i in wrong_passwords) {
                    await supertest(app)
                    .post("/users/login")
                    .send({
                        email: "kadir@gmail.com",
                        password: wrong_passwords[i],
                    })
                    .expect(400);
                }
            });
        });
        describe("given correct body was provided and email exists", () => {
            it("should return a 200 with correct response", async () => {
                axios.post.mockResolvedValueOnce({
                    data: {
                        access_token: "access_token",
                        email: "kadir@gmail.com",
                    },
                });
                const { body, statusCode } = await supertest(app)
                    .post("/users/login")
                    .send({
                        email: "kadir@gmail.com",
                        password: "Password*11",
                    });

                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    access_token: "access_token",
                    email: "kadir@gmail.com",
                });
            });
        });
        describe("given correct body was provided, but email does not exist in db", () => {
            it("should return a 409", async () => {
                axios.post.mockRejectedValueOnce({
                    
                });
                
                const { body, statusCode } = await supertest(app)
                    .post("/users/login")
                    .send({
                        email: "batu@gmail.com",
                        password: "Password*11",
                    });

                expect(statusCode).toBe(403);
                expect(body).toEqual({
                    message: "The user does not exist.",
                });
            });
        });
    });

    describe("getUsername route", () => {
        describe("given email exists", () => {
            it("should return a 200 with correct response", async () => {
                const { body, statusCode } = await supertest(app).get(
                    "/users/getUsername?email=kadir@gmail.com"
                );

                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    user_name: "kadir ersoy"
                });
            });
        });
        describe("given email does not exist", () => {
            it("should return a 400 with correct response", async () => {
                const { body, statusCode } = await supertest(app).get(
                    "/users/getUsername?email=batu@gmail.com"
                );

                expect(statusCode).toBe(400);
                expect(body).toEqual({
                    message: "User not found!"
                });
            });
        });
    });
});