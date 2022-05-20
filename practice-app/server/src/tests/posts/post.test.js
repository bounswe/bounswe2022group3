const supertest = require("supertest");
const app = require("../../app");
const axios = require("axios");
jest.mock("axios");


describe("post for all posts", () => {
    describe("given no body was provided", () => {
        it("should return a 400", async () => {
            axios.post.mockResolvedValueOnce({
                data: {
                    user_id: "",
                    title: "test1",
                    body: "test1",
                },
            });
            await supertest(app)
                .post("/posts/createPost")
                .expect(404);
        });
    });
    describe("given correct body was provided", () => {
        it("should return a 200 with correct response", async () => {
            axios.post.mockResolvedValueOnce({
                data: {
                    user_id: "arif",
                    title: "test1",
                    body: "test1",
                },
            });
            const { body, statusCode } = await supertest(app)
                .post("/post/createPost")
                .send({
                    user_id: "access_token",
                    title: "test1",
                    body: "test1",
                });

            expect(statusCode).toBe(201);
            expect(body).toEqual({
                status: "OK",
                message: "Post created succesfully!",
                response: "reponse",
            });
        });

    });

})


