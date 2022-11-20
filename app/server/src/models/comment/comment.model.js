const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    // TODO: Should this ine also relate to the user object? 
    // For now, leaving as is.
    user_id: String,
    comment_body: String,
    comment_date: Date,
    comment_files: [String]

});

commentSchema.set("timestamps", true)
const Comment = mongoose.model('Comment', commentSchema);

const createComment = async (userId, commentBody,  commentFiles) => {
    var comment = new Comment({
        user_id: userId,
        comment_body: commentBody,
        comment_files: commentFiles,
    })

    const commentTemp = await comment.save()
    commentTemp.comment_date = commentTemp.createdAt
    const res = await commentTemp.save()
    return res
}

const getComment = async (id) => {
    return Comment.findById(id)
}

module.exports = { Comment, createComment, getComment };
