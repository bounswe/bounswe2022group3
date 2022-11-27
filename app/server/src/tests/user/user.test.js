const supertest = require("supertest");
const { User, createUser } = require("../../models/user/user.model");
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



describe("User", () => {
    beforeAll(async () => {
        dbConnect();

        const AuthService = require("../../services/auth");
        spy = jest.spyOn(AuthService, "authorization");
        app = require("../../app");
    });
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
                wrong_emails = ["ahmet", "ahmet@", "ahmet@gmail", "ahmet@gmail.", "ahmet@.com", "@gmail.com", "ahmet.com"]
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
                wrong_passwords = ["password", "Password", "password*", "password*12", "Password11", "Password*"]
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
                // Mocking date to be able to test the createdAt response
                MockDate.set(1434319925275); // sets the date to a constant, doesn't change until reset
                const { body, statusCode } = await supertest(app)
                    .post("/user/register")
                    .send({
                        name: "kadir",
                        surname: "ersoy",
                        email: "kadir@gmail.com",
                        password: "Password*11",
                        agreement: true,
                    });
                expect(statusCode).toBe(201);
                expect(body).toEqual({
                    created_at: `${Date(1434319925275).toISOString()}`,
                    message: `Confirmation mail send to kadir@gmail.com.`,
                });
                // reset to native Date()
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
    describe("login route", () => {
        describe("given no body was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/user/login")
                    .expect(400);
            });
        });
        describe("given no email was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/user/login")
                    .send({
                        password: "Password*11",
                    })
                    .expect(400);
            });
        });
        describe("given no password was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/user/login")
                    .send({
                        email: "kadir@gmail.com",
                    })
                    .expect(400);
            });
        });
        describe("given incorrect email was provided", () => {
            it("should return a 400", async () => {
                wrong_emails = ["ahmet", "ahmet@", "ahmet@gmail", "ahmet@gmail.", "ahmet@.com", "@gmail.com", "ahmet.com"]
                for (const wEmail in wrong_emails) {
                    await supertest(app)
                        .post("/user/login")
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
                wrong_passwords = ["password", "Password", "password*", "password*12", "Password11", "Password*"]
                for (const i in wrong_passwords) {
                    await supertest(app)
                        .post("/user/login")
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
                // Mocking generate token function
                spy2 = jest.spyOn(auth, "generateToken").mockReturnValue("mockedToken");
                // Assuming user confirmed their mail
                const user = await User.findOne({ email: "kadir@gmail.com" });
                const tokens = await getTokensByEmail('kadir@gmail.com');
                tokens.confirmation_token = 'confirmed';
                await tokens.save();

                const { body, statusCode } = await supertest(app)
                    .post("/user/login")
                    .send({
                        email: "kadir@gmail.com",
                        password: "Password*11",
                    });

                expect(spy2).toHaveBeenCalledTimes(2);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    id: user._id.toString(),
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    access_token: 'mockedToken',
                    refresh_token: 'mockedToken'
                });
            });
        });
        describe("given correct body was provided, but email does not exist in db", () => {
            it("should return a 403", async () => {
                const { body, statusCode } = await supertest(app)
                    .post("/user/login")
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
        describe("given correct body was provided, but password does not match the one in db", () => {
            it("should return a 401", async () => {
                const { body, statusCode } = await supertest(app)
                    .post("/user/login")
                    .send({
                        email: "kadir@gmail.com",
                        password: "Passswwword*11",
                    });
                expect(statusCode).toBe(401);
                expect(body).toEqual({
                    message: "Incorrect Password !",
                });
            });
        });
        describe("given correct body was provided, but email is not confirmed", () => {
            it("should return a 403", async () => {
                // Creating a user in DB with unconfirmed email
                const user = await createUser({
                    email: "batu@gmail.com",
                    name: "batu",
                    surname: "ersoy",
                });
                const tokens = await createToken({
                    email: "batu@gmail.com",
                    password_hash: "passwd_data.hash",
                    password_salt: "passwd_data.salt",
                    password_iter: "passwd_data.iterations",
                    confirmation_token: "confirmationToken",
                });
                await user.save();
                await tokens.save();
                const { body, statusCode } = await supertest(app)
                    .post("/user/login")
                    .send({
                        email: "batu@gmail.com",
                        password: "Password*11",
                    });
                expect(statusCode).toBe(403);
                expect(body).toEqual({
                    message: "Please confirm your email to login to your account.",
                });
            });
        });
    });
    describe("logout route", () => {
        describe("given no auth token was provided", () => {
            it("should return a 400", async () => {
                spy.mockImplementation(async (req, res, next) => {
                    return auth.authorization(req, res, next);
                });
                const { body, statusCode } = await supertest(app)
                    .post("/user/logout")
                    .send({
                        email: "kadir@gmail.com",
                    });
                expect(statusCode).toBe(400);
                expect(body).toEqual({
                    message: "Authorization token missing !",
                });
            });
        });
        describe("given auth token was provided", () => {
            it("should return a 200 with correct response", async () => {
                const user = await User.findOne({ email: "kadir@gmail.com" });
                spy.mockImplementation(async (req, _, next) => {
                    req.auth = user;
                    return next();
                });
                const { body, statusCode } = await supertest(app)
                    .post("/user/logout")
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    message: "Logout is successful!",
                });
            });
        });
    });
    describe("refresh_tokens route", () => {
        describe("given user is not confirmed", () => {
            it("should return a 400", async () => {
                const confirmationToken = await auth.generateToken("batu@gmail.com", "jwt_conf_secret", "1d")
                const { body, statusCode } = await supertest(app)
                    .post("/user/refresh_tokens")
                    .send({
                        email: "batu@gmail.com",
                        refresh_token: confirmationToken,
                    });
                expect(statusCode).toBe(403);
                expect(body).toEqual({
                    message: "Please confirm your email to refresh your tokens.",
                });
            });
        });
        describe("given correct refresh token was provided", () => {
            it("should return a 200", async () => {
                const tokens = await getTokensByEmail('kadir@gmail.com');
                tokens.access_token = "mockedToken";
                tokens.refresh_token = "mockedToken";
                await tokens.save();
                spy3 = jest.spyOn(jwt, "verify").mockImplementation( (r,s) => {
                    decoded = {
                        email : "kadir@gmail.com",
                    }
                    return {decoded};
                });
                spy2 = jest.spyOn(auth, "generateToken").mockReturnValue("newMockedToken");
                const { body, statusCode } = await supertest(app)
                    .post("/user/refresh_tokens")
                    .send({
                        email: "kadir@gmail.com",
                        refresh_token: "mockedToken",
                    });
                expect(spy3).toHaveBeenCalledTimes(1);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    access_token: "newMockedToken",
                    refresh_token: "newMockedToken",
                });
            });
        });
    });
    describe("confirm_email route", () => {
        describe("given no user with given email", () => {
            it("should return a 400", async () => {
                const confirmationToken = await auth.generateToken("stranger@gmail.com", "jwt_conf_secret", "1d")
                spy3 = jest.spyOn(jwt, "verify").mockImplementation( (r,s) => {
                    decoded = {
                        email : "stranger@gmail.com",
                    }
                    return {decoded};
                });
                const { body, statusCode } = await supertest(app)
                    .post("/user/confirm-email")
                    .send({
                        code: confirmationToken,
                    });
                expect(statusCode).toBe(400);
                expect(body).toEqual({
                    message: "There is not any registered user with this email!",
                });
            });
        });
        describe("given token and user doesn't match", () => {
            it("should return a 400", async () => {
                const confirmationToken = await auth.generateToken("stranger@gmail.com", "jwt_conf_secret", "1d")
                spy3 = jest.spyOn(jwt, "verify").mockImplementation( (r,s) => {
                    decoded = {
                        email : "kadir@gmail.com",
                    }
                    return {decoded};
                });
                const { body, statusCode } = await supertest(app)
                    .post("/user/confirm-email")
                    .send({
                        code: confirmationToken,
                    });
                expect(statusCode).toBe(400);
                expect(body).toEqual({
                    message: "Confirmation token does not match.",
                });
            });
        });
        describe("given token is valid and user matches", () => {
            it("should return a 200", async () => {
                const confirmationToken = await auth.generateToken("kadir@gmail.com", "jwt_conf_secret", "1d")
                const tokens = await getTokensByEmail('kadir@gmail.com');
                tokens.confirmation_token = confirmationToken;
                await tokens.save();
                const user = await User.findOne({ email: "kadir@gmail.com" });
                spy3 = jest.spyOn(jwt, "verify").mockImplementation( (r,s) => {
                    decoded = {
                        email : "kadir@gmail.com",
                    }
                    return {decoded};
                });
                spy2 = jest.spyOn(auth, "generateToken").mockReturnValue("newMockedToken");
                const { body, statusCode } = await supertest(app)
                    .post("/user/confirm-email")
                    .send({
                        code: confirmationToken,
                    });
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    id: user._id.toString(),
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token,
                });
            });
        });
    });
    describe("resend_confirmation route", () => {
        describe("given user is already confirmed", () => {
            it("should return a 200", async () => {
                // const confirmationToken = await auth.generateToken("stranger@gmail.com", "jwt_conf_secret", "1d")
                // spy3 = jest.spyOn(jwt, "verify").mockImplementation( (r,s) => {
                //     decoded = {
                //         email : "kadir@gmail.com",
                //     }
                //     return {decoded};
                // });
                const { body, statusCode } = await supertest(app)
                    .post("/user/resend_confirmation")
                    .send({
                        email: 'kadir@gmail.com',
                    });
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    message: "User is already confirmed. Proceed to login.",
                });
            });
        });
    });
});