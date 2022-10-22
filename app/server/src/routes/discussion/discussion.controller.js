const DiscussionModel = require("../../models/discussions/discussions.model");

const DiscussionController = {
    createDiscussion: async function (req, res) {
        try {
            const { user_id, course_id, comment_id_list, discussion_body, discussion_files } = req.body

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
            res.status(400).send({ "error": e })
        }
    },
    getDiscussion: async function (req, res) {
        try {
            const content = await DiscussionModel.getPopulatedDiscussion(req.params.id)
            res.send({ "status": "ok", "message": content })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },
};

module.exports = DiscussionController;