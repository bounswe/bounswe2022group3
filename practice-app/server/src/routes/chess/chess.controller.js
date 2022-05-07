const ChessModel = require("../../models/chess/chess.model");
const axios = require("axios");

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

        const response = (await axios.post(url, payload, headers)).data;

        if (response && response.id) {
            const game = await ChessModel.createGame(
                response.id,
                selectedColor
            );
            if (game) {
                return res.status(200).json({
                    game_id: response.id,
                    player_color: selectedColor,
                });
            }
        }

        return res.status(500).json({
            message: "Could not initiate a game against the AI",
        });
    },
};

module.exports = ChessController;
