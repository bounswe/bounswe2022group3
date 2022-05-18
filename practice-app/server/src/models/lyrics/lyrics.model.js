const mongoose = require("mongoose");

const lyricsSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Types.ObjectId,
    //     ref:"User",
    //     required: [true, "Saved lyrics must belong to a user"],
    // },
    lyrics_id: {
        type: Number,
        default: -1,
        required: true
    },
    full_title: {
        type: String,
    },
    url: {
        type: String,
    },

});

const Lyrics = mongoose.model("Lyrics",lyricsSchema);

module.exports = Lyrics;