const UserModel = require("../../models/users/users.model");
const ChapterModel = require("../../models/chapters/chapters.model");
const BadgeModel = require("../../models/badges/badges.model");
const ContentModel = require("../../models/contents/contents.model");
const DiscussionModel = require("../../models/discussions/discussions.model");
const CommentModel = require("../../models/comments/comments.model");

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
            const { chapter_name, chapter_badge_id, content_id_list } = req.body
            const chapter = await ChapterModel.createChapter(
                chapter_name,
                chapter_badge_id,
                content_id_list,
            )
            res.send({ "status": "ok", "message": chapter })
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
            const { title, description } = req.body
            const badge = await BadgeModel.createBadge(
                title,
                description,
            )
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
            const { name, body, media, discussion_id } = req.body
            const badge = await ContentModel.createContent(
                name,
                body,
                media,
                discussion_id,
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
            const content = await ContentModel.getPopulatedContent(req.params.id)
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
            // const { user_id, course_id, comment_id_list, discussion_body, discussion_files } = req.body
            var { user_id, course_id, comment_id_list, discussion_body, discussion_files } = req.body

            // comment_id_list = ["comment_id_1", "comment_id_2"],
            console.log("PARAMETERS:", req.body, user_id, course_id, comment_id_list, discussion_body, discussion_files)
            const discussion = await DiscussionModel.createDiscussion(
                user_id,
                course_id,
                comment_id_list,
                discussion_body,
                discussion_files,
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
            const content = await DiscussionModel.getPopulatedDiscussion(req.params.id)
            res.send({ "status": "ok", "message": content })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },

    // Comment...
    getCommentCreate: async function (req, res) {
        try {
            var { user_id, comment_body, comment_files } = req.body

            const comment = await CommentModel.createComment(
                user_id,
                comment_body,
                comment_files,
            )
            res.send({ "status": "ok", "message": comment })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },
    getComment: async function (req, res) {
        try {
            console.log("REQ:", req.params.id)
            const content = await CommentModel.getComment(req.params.id)
            res.send({ "status": "ok", "message": content })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },

};

module.exports = BasicController;