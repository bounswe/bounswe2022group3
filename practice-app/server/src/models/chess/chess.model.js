const mongoose = require("mongoose");

const chessGameSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: [true, "Booking must belong to a User!"],
    // },
    game_id: {
        type: String,
        default: "",
        required: [true, "Must have id!"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    moves: {
        type: String,
        default: "",
    },
    player_color: {
        type: String,
        default: "",
    },
    winner_color: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "started",
    },
});

const ChessGame = mongoose.model("ChessGame", chessGameSchema);

module.exports = ChessGame;
