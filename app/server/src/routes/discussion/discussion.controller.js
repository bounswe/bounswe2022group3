const DiscussionModel = require("../../models/discussions/discussions.model");

const DiscussionController = {
    createDiscussion: async function (req, res) {
        try {
            const { user_id, space_id, comment_id_list, body, files } = req.body

            const discussion = await DiscussionModel.createDiscussion(
                user_id,
                space_id,
                comment_id_list,
                body,
                files,
            )
            res.status(201).send({ "message": discussion })
        }
        catch (e) {
            res.status(400).send({ "error": e })
        }
    },
    getDiscussion: async function (req, res) {
        try {
            const content = await DiscussionModel.getPopulatedDiscussion(req.params.id)
            res.status(200).json({ "message": content })
        }
        catch (e) {
            res.status(400).send({ "error": e })
        }
    },
};

module.exports = DiscussionController;