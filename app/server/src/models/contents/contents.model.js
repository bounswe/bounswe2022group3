const mongoose = require("mongoose")

const contentSchema = new mongoose.Schema({
    name: String,
    body: String,
    media: [String],
    discussion: { type: mongoose.Schema.Types.ObjectId, ref: "Discussion" },
    video: String,
})
const Content = mongoose.model('Content', contentSchema);

const createContent = async (name, body, media, discussion_id, video_link) => {
    var content = new Content({
        name: name,
        body: body,
        media: media,
        discussion: discussion_id,
        video: video_link
    })
    const res = await content.save()
    return res
}

const getContent = async (id) => {
    var content = Content.findById(id)
    return content
}

const getPopulatedContent = async (id) => {
    return Content.findById(id).populate("discussion").exec()
}

module.exports = { Content, getContent, createContent, getPopulatedContent };