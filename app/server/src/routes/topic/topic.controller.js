const TopicModel = require("../../models/topic/topic.model");

const TopicController = {
    createTopic: async function (req, res) {
        try {
            const { name, badge, resources } = req.body
            const topic = await TopicModel.createTopic(
                name,
                badge,
                resources,
            )
            res.status(201).json({ "message": topic })
        }
        catch (e) {
            res.status(400).send({ "error": e })
        }
    },
    getPopulatedTopic: async function (req, res) {
        try {
            const topic = await TopicModel.getPopulatedTopic(req.params.id)
            res.status(200).json({ "message": topic })
        }
        catch (e) {
            res.status(400).send({ "error": e })
        }
    },
};

module.exports = TopicController;