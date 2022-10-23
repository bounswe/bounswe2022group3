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
            res.json(201).json({ "message": discussion })
        }
        catch (e) {
            res.status(400).send({ "error": e })
        }
    },
    getDiscussion: async function (req, res) {
        try {
            const content = await DiscussionModel.getPopulatedDiscussion(req.params.id)
            res.json(200).json({ "message": content })
        }
        catch (e) {
            res.status(400).send({ "error": e })
        }
    },
};

module.exports = DiscussionController;