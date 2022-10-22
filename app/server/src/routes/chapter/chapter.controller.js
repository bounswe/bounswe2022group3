const ChapterModel = require("../../models/chapters/chapters.model");

const ChapterController = {
    createChapter: async function (req, res) {
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
            res.status(400).send({ "error": e })
        }
    },
    getPopulatedChapter: async function (req, res) {
        try {
            const chapter = await ChapterModel.getPopulatedChapter(req.params.id)
            res.send({ "status": "ok", "message": chapter })
        }
        catch (e) {
            res.status(400).send({ "error": e })
        }
    },
};

module.exports = ChapterController;