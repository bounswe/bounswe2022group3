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
    // discussion.discussion_date = discussion
    console.log("DISCUSSION:", discussion)
    const res = await discussion.save()
    return res
}



//   const getPopulatedDiscussion = async (id) => {
//     return Discussion.findById(id).populate("")
//   return Chapter.findById(id).populate("chapter_badge content chapter_name").exec()

//   }

const getDiscussion = async (id) => {
    return Discussion.findById(id)
}

module.exports = { Discussion, createDiscussion, getDiscussion };
