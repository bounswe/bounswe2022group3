const mongoose = require("mongoose")

const resourceSchema = new mongoose.Schema({
    name: String,
    body: String,
    media: [String],
    discussion: { type: mongoose.Schema.Types.ObjectId, ref: "Discussion" },
    video: String,
})
const Resource = mongoose.model('Resource', resourceSchema);

const createResource = async (name, body, media, discussion, video_link) => {
    var resource = new Resource({
        name,
        body,
        media,
        discussion,
        video: video_link
    })
    const res = await resource.save()
    return res
}

const getResource = async (id) => {
    var resource = Resource.findById(id)
    return resource
}

const getPopulatedResource = async (id) => {
    return Resource.findById(id).populate("discussion").exec()
}

module.exports = { Resource, getResource, createResource, getPopulatedResource };
