const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
    user_id: String,
    course_id: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    discussion_body: String,
    discussion_date: Date,
    discussion_files: [{ type: String }],
});

discussionSchema.set("timestamps", true)
const Discussion = mongoose.model('Discussion', discussionSchema);

const createDiscussion = async (userId, courseId, comments, discussionBody, discussionFiles) => {
    var discussion = new Discussion({
        user_id: userId,
        course_id: courseId,
        comments: comments,
        discussion_body: discussionBody,
        discussion_files: discussionFiles,
    })

    // Just to set the creation time...
    const discussionTemp = await discussion.save()
    discussionTemp.discussion_date = discussionTemp.createdAt
    const res = await discussionTemp.save()
    return res
}



  const getPopulatedDiscussion = async (id) => {
    return Discussion.findById(id).populate("comments").exec()
  }

const getDiscussion = async (id) => {
    return Discussion.findById(id)
}

module.exports = { Discussion, createDiscussion, getDiscussion, getPopulatedDiscussion };
