const axios = require("axios");
const needle = require("needle");
const ndjsonParser = require("ndjson-parse");
const ndjson = require("ndjson");
const ChessGame = require("../../models/chess/chess.model");
const db = require("../../services/db");

const ChessController = {
    createGame: async function (req, res) {
        // Get user input
        const { difficulty, color } = req.body;

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
            console.log(e);
        }

        return res.status(500).json({
            message: "Could not initiate a game against the AI",
        });
    },
    makeMove: async function (req, res) {
        // Get user input
        const { gameId, moveStr } = req.body;

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
                .status(400)
                .json({ message: "Could not make the move." });
        }

        return res.status(500).json(response);
    },
    streamGame: async function (req, res) {
        const { gameId } = req.params;

        const url = `https://lichess.org/api/board/game/stream/${gameId}`;
        const headers = {
            Authorization: `Bearer ${process.env.LICHESS_TOKEN}`,
        };

        try {
            const stream = needle.get(url, {
                headers,
            });
            stream
                .pipe(ndjson.parse())
                .on("data", (data) => {
                    try {
                        const state = data.state ? data.state : data;

                        if (
                            state.moves !== undefined &&
                            state.status !== undefined
                        ) {
                            db.collection("chessgames").updateOne(
                                { game_id: gameId },
                                {
                                    $set: {
                                        moves: state.moves,
                                        status: state.status,
                                    },
                                }
                            );
                        }

                     
                        if (state.status === "mate") {
                            db.collection("chessgames").updateOne(
                                { game_id: gameId },
                                {
                                    $set: {
                                        winner_color: state.winner
                                    },
                                }
                            );
                        }

                        res.write(JSON.stringify(data) + "\n");
                    } catch (e) {
                        console.log(e);
                    }
                })
                .on("err", (error) => {
                    console.log(error);
                    res.end();
                });

            req.on("close", function () {
                stream.removeAllListeners();
            });
        } catch (e) {
            console.log(e);
        }
    },
    getGames: async function (req, res) {
        try {
            const games = await ChessGame.find({}, 'game_id createdAt player_color winner_color status');
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
        try {
            const game = (await ChessGame.find({ game_id: gameId }, 'moves player_color'))[0];
            return res.status(200).json({
                game,
            });
        } catch (e) {
            return res
                .status(500)
                .json({ message: "Could not retrieve game." });
        }
    },
};

module.exports = ChessController;
