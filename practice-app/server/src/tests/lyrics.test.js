const supertest = require("supertest");
const axios = require("axios");
const { dbConnect, dbDisconnect } = require("./utils/db");
const { User } = require("../models/users/users.model");

let app;
let spy;
let user;
jest.mock("axios");

describe("Lyrics", () => {
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
    describe("search_lyrics route", () => {
        describe("given no body was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/lyrics/search_lyrics")
                    .expect(400);
            });
        });

        describe("given correct body was provided", () => {
            it("should return a 200 with correct response", async () => {
                axios.get.mockResolvedValueOnce({
                    data: {
                        meta: {
                            status: 200
                        },
                        response: {
                            hits: [
                                {
                                    result: {
                                        full_title: "Song by Someone",
                                        id: 123456,
                                        url: "https://genius.com/someone-song-lyrics",
                                    }
                                }
                            ]
                        }
                    },
                });

                const { body, statusCode } = await supertest(app)
                    .post("/lyrics/search_lyrics")
                    .send({
                        searchparameter: "eminem"
                    });

                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    searchresult: [
                        {
                            full_title: "Song by Someone",
                            lyrics_id: 123456,
                            url: "https://genius.com/someone-song-lyrics"
                        }
                    ]
                });
            });
        });
    });

    describe("save_lyrics route", () => {
        describe("given no body was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/lyrics/save_lyrics")
                    .expect(400);
            });
        });

        describe("given no lyrics_id was provided", () => {
            it("should return a 400", async () => {


                await supertest(app)
                    .post("/lyrics/save_lyrics")
                    .send({
                        full_title: "Song by someone",
                        url: "https://genius.com/someone-song-lyrics",
                    })
                    .expect(400);
            });
        });

        describe("given no full_title was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/lyrics/save_lyrics")
                    .send({
                        url: "https://genius.com/someone-song-lyrics",
                        lyrics_id: 811
                    })
                    .expect(400);
            });
        });

        describe("given no url was provided", () => {
            it("should return a 400", async () => {
                await supertest(app)
                    .post("/lyrics/save_lyrics")
                    .send({
                        full_title: "Song by someone",
                        lyrics_id: 811
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

                const { body, statusCode } = await supertest(app)
                    .post("/lyrics/save_lyrics")
                    .send({
                        url: "https://genius.com/someone-song-lyrics",
                        full_title: "Song by someone",
                        lyrics_id: 811
                    });

                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    lyrics_id: 811
                });
            });
        });
    });

    describe("saved_lyrics route", () => {

        describe("Authorization token provided", () => {
            it("should return a 200 with correct response", async () => {
                spy.mockImplementation(async (req, _, next) => {
                    req.auth = user;
                    return next();
                });

                const { body, statusCode } = await supertest(app)
                    .get("/lyrics/saved_lyrics");

                expect(statusCode).toBe(200);

                expect(body.saved_lyrics[0]._id).toEqual(expect.any(String));
                expect(body.saved_lyrics[0].user).toEqual(expect.any(String));
                expect(body.saved_lyrics[0].url).toEqual('https://genius.com/someone-song-lyrics');
                expect(body.saved_lyrics[0].full_title).toEqual("Song by someone");
            });
        });

    });
});