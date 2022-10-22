const ContentModel = require("../../models/contents/contents.model");

const ContentController = {
    createContent: async function (req, res) {
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
            res.status(400).send({ "error": e })
        }
    },
    getContent: async function (req, res) {
        try {
            const content = await ContentModel.getPopulatedContent(req.params.id)
            res.send({ "status": "ok", "message": content })
        }
        catch (e) {
            res.status(400).send({ "error": e })
        }
    },
};

module.exports = ContentController;