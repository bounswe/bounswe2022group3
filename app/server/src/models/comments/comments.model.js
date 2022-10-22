const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment_id: String,
    user_id: String,
    comment_body: String,
    comment_date: Date,
    comment_files: [{ type: String }]

});

commentSchema.set("timestamps", true)
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
