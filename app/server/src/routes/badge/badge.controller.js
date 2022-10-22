const BadgeModel = require("../../models/badges/badges.model");

const BadgeController = {
    createBadge: async function (req, res) {
        try {
            const { title, description } = req.body
            const badge = await BadgeModel.createBadge(
                title,
                description,
            )
            res.send({ "status": "ok", "message": badge })
        }
        catch (e) {
            res.status(400).send({ "error": e })
        }
    },
    getBadge: async function (req, res) {
        try {
            const badge = await BadgeModel.getBadge(req.params.id)
            res.send({ "status": "ok", "message": badge })
        }
        catch (e) {
            res.status(400).send({ "error": e })
        }
    },
};

module.exports = BadgeController;