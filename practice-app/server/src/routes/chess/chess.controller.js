const axios = require("axios");
const needle = require("needle");
const ndjson = require("ndjson");
const ChessGame = require("../../models/chess/chess.model");

const ChessController = {
    createGame: async function (req, res) {
        // Get user input
        const { difficulty, color } = req.body;
        const user = req.auth;

        const url = "https://lichess.org/api/challenge/ai";

        let selectedColor = color;
        if (selectedColor === "random") {
            selectedColor = Math.random() < 0.5 ? "white" : "black";
        }
        const payload = {
            variant: "standard",
            level: difficulty,
            color: selectedColor,
        };
        const headers = {
            headers: {
                Authorization: `Bearer ${process.env.LICHESS_TOKEN}`,
            },
        };

        try {
            const response = (await axios.post(url, payload, headers)).data;

            if (response && response.id) {
                const game = await ChessGame.create({
                    user,
                    game_id: response.id,
                    player_color: selectedColor,
                });
                if (game) {
                    return res.status(200).json({
                        game_id: response.id,
                        player_color: selectedColor,
                    });
                }
            }
        } catch (e) {
            return res
                .status(500)
                .json({ message: "Could not initiate a game against the AI" });
        }
    },
    makeMove: async function (req, res) {
        // Get user input
        const { gameId, moveStr } = req.body;
        const user = req.auth;

        const game = await ChessGame.findOne(
            { game_id: gameId, user },
            "moves player_color"
        );

        if (!game) {
            return res
                .status(404)
                .json({ message: "Game not found." });
        }

        const url = `https://lichess.org/api/board/game/${gameId}/move/${moveStr}`;

        const payload = {};
        const headers = {
            headers: {
                Authorization: `Bearer ${process.env.LICHESS_TOKEN}`,
            },
        };

        try {
            const response = (await axios.post(url, payload, headers)).data;

            if (response && response.ok) {
                return res.status(200).json({
                    ok: true,
                });
            }
        } catch (e) {
            return res
                .status(500)
                .json({ message: "Could not make the move." });
        }
    },
    streamGame: async function (req, res) {
        console.log(1)
        const { gameId } = req.params;
        console.log(2)
        const user = req.auth;
        console.log(3)
        const game = await ChessGame.findOne(
            { game_id: gameId, user },
            "moves player_color"
        );
        console.log(4)
        if (!game) {
            return res
                .status(404)
                .json({ message: "Game not found." });
        }
        console.log(5)
        const url = `https://lichess.org/api/board/game/stream/${gameId}`;
        const headers = {
            Authorization: `Bearer ${process.env.LICHESS_TOKEN}`,
        };
        console.log(6)
        try {
            const stream = needle.get(url, {
                headers,
            });
            stream
                .pipe(ndjson.parse())
                .on("data", async (data) => {
                    console.log(data)
                    try {
                        const state = data.state ? data.state : data;
                        console.log(state.moves, state.status)
                        if (
                            state.moves !== undefined &&
                            state.status !== undefined
                        ) {
                            await ChessGame.updateOne(
                                { game_id: gameId },
                                {
                                    $set: {
                                        moves: state.moves,
                                        status: state.status,
                                    },
                                }
                            );
                        }
                        console.log(8)
                        if (state.status === "mate") {
                            await ChessGame.updateOne(
                                { game_id: gameId },
                                {
                                    $set: {
                                        winner_color: state.winner,
                                    },
                                }
                            );
                        }
                        console.log(9)
                        res.write(JSON.stringify(data) + "\n");
                    } catch (e) {
                        console.log(10)
                        console.log(e);
                    }
                })
                .on("err", (error) => {
                    console.log(error);
                    res.end();
                });

            req.on("close", function () {
                console.log(11)
                stream.removeAllListeners();
            });
        } catch (e) {
            console.log(e);
            return res
                .status(500)
                .json({ message: "Cannot not stream the game." });
        }
    },
    getGames: async function (req, res) {
        const user = req.auth;

        try {
            const games = await ChessGame.find(
                { user },
                "game_id createdAt player_color winner_color status"
            );

            return res.status(200).json({
                games,
            });
        } catch (e) {
            return res
                .status(500)
                .json({ message: "Could not retrieve games." });
        }
    },
    getGame: async function (req, res) {
        const { gameId } = req.params;
        const user = req.auth;

        try {
            const game = await ChessGame.findOne(
                { game_id: gameId, user },
                "moves player_color"
            );
            if (game) {
                return res.status(200).json({
                    game,
                });
            } else {
                return res.status(404).json({
                    message: "Game not found.",
                });
            }
        } catch (e) {
            return res
                .status(500)
                .json({ message: "Could not retrieve game." });
        }
    },
};

module.exports = ChessController;
