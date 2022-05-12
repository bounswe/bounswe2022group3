const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    date: { type: Date },
    text: { type: String },
    author_id: { type: String },
    tag: { type: String },
});
TweetSchema.index({ "id": 1 }, { unique: true })

const Tweet = mongoose.model("Tweet", TweetSchema)

module.exports = Tweet