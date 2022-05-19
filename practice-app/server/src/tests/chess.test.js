const supertest = require("supertest");
const axios = require("axios");
const { dbConnect, dbDisconnect } = require("./utils/db");
const { User } = require("../models/users/users.model");
let app;
let spy;
let user;
jest.mock("axios");

describe("Chess", () => {
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
    describe("create_game route", () => {
        describe("given no difficulty was provided", () => {
            it("should return a 400", async () => {
                await supertest(app).post("/chess/create_game").expect(400);
            });
        });
        describe("given no color was provided", () => {
            it("should return a 400", async () => {
                await supertest(app).post("/chess/create_game").expect(400);
            });
        });
        describe("given incorrect difficulty was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/chess/create_game")
                    .send({
                        difficulty: 10,
                        color: "white",
                    })
                    .expect(400);
            });
        });
        describe("given incorrect color was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/chess/create_game")
                    .send({
                        difficulty: 1,
                        color: "",
                    })
                    .expect(400);
            });
        });
        describe("given correct body was provided", () => {
            it("should return a 200 with correct response", async () => {
                spy.mockImplementation(async (req, _, next) => {
                    req.auth = user;
                    return next();
                });
                axios.post.mockResolvedValueOnce({
                    data: {
                        id: "id",
                    },
                });

                const { body, statusCode } = await supertest(app)
                    .post("/chess/create_game")
                    .send({
                        difficulty: 1,
                        color: "white",
                    });

                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    game_id: "id",
                    player_color: "white",
                });
            });
        });
    });

    describe("make_move route", () => {
        describe("given no body was provided", () => {
            it("should return a 400", async () => {
                await supertest(app).post("/chess/make_move").expect(400);
            });
        });
        describe("given no gameId was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/chess/make_move")
                    .send({
                        moveStr: "e2e4",
                    })
                    .expect(400);
            });
        });
        describe("given no moveStr was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/chess/make_move")
                    .send({
                        gameId: "id",
                    })
                    .expect(400);
            });
        });
        describe("given correct body (move) was provided", () => {
            it("should return a 200 with correct response", async () => {
                spy.mockImplementation(async (req, _, next) => {
                    req.auth = user;
                    return next();
                });
                axios.post.mockResolvedValueOnce({
                    data: {
                        ok: true,
                    },
                });

                const { body, statusCode } = await supertest(app)
                    .post("/chess/make_move")
                    .send({
                        gameId: "id",
                        moveStr: "e2e4",
                    });

                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    ok: true,
                });
            });
        });
        describe("given incorrect body (move) was provided", () => {
            it("should return a 400 with correct response", async () => {
                spy.mockImplementation(async (req, _, next) => {
                    req.auth = user;
                    return next();
                });
                axios.post.mockRejectedValueOnce({
                    data: {
                        error: "error",
                    },
                });

                const { body, statusCode } = await supertest(app)
                    .post("/chess/make_move")
                    .send({
                        gameId: "id",
                        moveStr: "e2e4",
                    });

                expect(statusCode).toBe(400);
                expect(body).toEqual({
                    message: "Could not make the move.",
                });
            });
        });
    });

    describe("games route", () => {
        describe("given user wants to list all games", () => {
            it("should return a 200 with correct response", async () => {
                spy.mockImplementation(async (req, _, next) => {
                    req.auth = user;
                    return next();
                });
                const { body, statusCode } = await supertest(app).get(
                    "/chess/games"
                );
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    games: [
                        {
                            _id: expect.any(String),
                            game_id: "id",
                            createdAt: expect.any(String),
                            player_color: "white",
                            winner_color: "",
                            status: "started",
                        },
                    ],
                });
            });
        });
    });

    describe("/game/:gameId route", () => {
        describe("given game gameId does not exist", () => {
            it("should return a 200 with correct response", async () => {
                spy.mockImplementation(async (req, _, next) => {
                    req.auth = user;
                    return next();
                });
                const { body, statusCode } = await supertest(app).get(
                    "/chess/game/QBqUFwvF"
                );

                expect(statusCode).toBe(404);
                expect(body).toEqual({
                    message: "Game not found.",
                });
            });
        });
        describe("given game gameId exists", () => {
            it("should return a 200 with correct response", async () => {
                spy.mockImplementation(async (req, _, next) => {
                    req.auth = user;
                    return next();
                });
                const { body, statusCode } = await supertest(app).get(
                    "/chess/game/id"
                );

                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    game: {
                        _id: expect.any(String),
                        player_color: "white",
                        moves: "",
                    },
                });
            });
        });
    });
});
