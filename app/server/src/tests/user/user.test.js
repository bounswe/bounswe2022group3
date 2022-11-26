const supertest = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const mongoose = require("mongoose");
const app = require("../../app");
const axios = require("axios");
const {User} = require("../../models/user/user.model");
const { dbConnect, dbDisconnect } = require("../utils/db");
jest.mock("axios");
var MockDate = require('mockdate');

describe("User", () => {
    beforeAll(async () => dbConnect());
    afterAll(async () => dbDisconnect());
    describe("register route", () => {
        describe("given no body was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                .post("/user/register")
                .expect(400);
            });
        });
        describe("given no first_name was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/user/register")
                    .send({
                        surname: "ersoy",
                        email: "ahmet@gmail.com",
                        password: "Password*11",
                        agreement: true,
                    })
                    .expect(400);
            });
        });
        describe("given no last_name was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/user/register")
                    .send({
                        name: "ersoy",
                        email: "ahmet@gmail.com",
                        password: "Password*11",
                        agreement: true,
                    })
                    .expect(400);
            });
        });
        describe("given no email was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/user/register")
                    .send({
                        name: "ahmet",
                        surname: "ersoy",
                        password: "Password*11",
                        agreement: true,
                    })
                    .expect(400);
            });
        });
        describe("given no password was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/user/register")
                    .send({
                        name: "akadir",
                        surname: "ersoy",
                        email: "ahmet@gmail.com",
                        agreement: true,
                    })
                    .expect(400);
            });
        });
        describe("given incorrect email was provided", () => {
            it("should return a 400", async () => {
                wrong_emails = ["ahmet","ahmet@","ahmet@gmail","ahmet@gmail.","ahmet@.com","@gmail.com","ahmet.com"]
                for (const wEmail in wrong_emails) {
                    await supertest(app)
                    .post("/user/register")
                    .send({
                        name: "ersoy",
                        surname: "ersoy",
                        email: wrong_emails[wEmail],
                        password: "Password*11",
                        agreement: true,
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
                    .post("/user/register")
                    .send({
                        name: "ersoy",
                        surname: "ersoy",
                        email: "kadir@gmail.com",
                        password: wrong_passwords[i],
                        agreement: true,
                    })
                    .expect(400);
                }
            });
        });
        describe("given agreement was not accepted", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/user/register")
                    .send({
                        name: "akadir",
                        surname: "ersoy",
                        password: "Password*11",
                        email: "ahmet@gmail.com",
                        agreement: false,
                    })
                    .expect(400);
            });
        });
        describe("given correct body was provided", () => {
            it("should return a 201 with correct response", async () => {
                MockDate.set(1434319925275);
                // test code here
                // reset to native Date()
                const { body, statusCode } = await supertest(app)
                    .post("/user/register")
                    .send({
                        name: "kadir",
                        surname: "ersoy",
                        email: "kadir@gmail.com",
                        password: "Password*11",
                        agreement: true,
                    });
                console.log(body);
                expect(statusCode).toBe(201);
                expect(body).toEqual({
                    created_at: `${Date(1434319925275).toISOString()}`,
                    message: `Confirmation mail send to kadir@gmail.com.`,
                });
                MockDate.reset();
            });
        });
        describe("given already existing user was provided", () => {
            it("should return a 409", async () => {
                
                const { body, statusCode } = await supertest(app)
                    .post("/user/register")
                    .send({
                        name: "ersoy",
                        surname: "ersoy",
                        email: "kadir@gmail.com",
                        password: "Password*11",
                        agreement: true,
                });
                expect(statusCode).toBe(409);
                expect(body).toEqual({
                    message: "The user already exists.",
                });
            });
        });
    });
});