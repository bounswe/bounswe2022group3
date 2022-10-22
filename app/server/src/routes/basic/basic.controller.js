const UserModel = require("../../models/users/users.model");
const ChapterModel = require("../../models/chapters/chapters.model");
const BadgeModel = require("../../models/badges/badges.model");
const ContentModel = require("../../models/contents/contents.model");
const DiscussionModel = require("../../models/discussions/discussions.model");





const BasicController = {

    getCall: async function (req, res) {

        try {
            res.send({ "status": "ok", "message": "Hello!" })
        }
        catch (e) {
            console.log("Error on getCall:", e)
            res.status(400).send({ "error": e })
        }
    },
    getCreate: async function (req, res) {
        try {
            await UserModel.createUser("email", "name", "surname", "password")
            res.send({ "status": "ok", "message": "Created!" })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },
    getDelete: async function (req, res) {
        try {
            await UserModel.deleteUser("email")
            res.send({ "status": "ok", "message": "Deleted!" })
        }
        catch (e) {
            console.log("Error on getDelete:", e)
            res.status(400).send({ "error": e })
        }
    },

    // Chapters...
    getChapterCreate: async function (req, res) {
        try {
            await ChapterModel.createChapter(
                "chapter_name",
                "635433911505679c5136adfb",
                ["6354270ce9005b8ba3e50f52", "63542711e9005b8ba3e50f54"]
            )
            res.send({ "status": "ok", "message": "Chapter Created!" })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },
    getPopulatedChapter: async function (req, res) {
        try {
            const chapter = await ChapterModel.getPopulatedChapter(req.params.id)
            res.send({ "status": "ok", "message": chapter })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },

    // Badges...
    getBadgeCreate: async function (req, res) {
        try {
            const badge = await BadgeModel.createBadge("badge_title", "badge_description")
            res.send({ "status": "ok", "message": badge })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },
    getBadge: async function (req, res) {
        try {
            const badge = await BadgeModel.getBadge(req.params.id)
            res.send({ "status": "ok", "message": badge })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },

    // Content
    getContentCreate: async function (req, res) {
        try {
            const badge = await ContentModel.createContent(
                "content_name",
                "content_body",
                ["content_media_1", "content_media_2"],
                "discussion_id"
            )
            res.send({ "status": "ok", "message": badge })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },
    getContent: async function (req, res) {
        try {
            console.log("REQ:", req.params.id)
            const content = await ContentModel.getContent(req.params.id)
            res.send({ "status": "ok", "message": content })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },

     // Discussion...
     getDiscussionCreate: async function (req, res) {
        try {
            const discussion = await DiscussionModel.createDiscussion(
                "user_id",
                "course_id",
                ["comment_id_1", "comment_id_2"],
                "discussion_body",
                ["discussion_file_1", "discussion_file_2"]
                )
            res.send({ "status": "ok", "message": discussion })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },
    getDiscussion: async function (req, res) {
        try {
            console.log("REQ:", req.params.id)
            const content = await DiscussionModel.getDiscussion(req.params.id)
            res.send({ "status": "ok", "message": content })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },

};

module.exports = BasicController;