const AnnotationModel = require("../../models/annotation/annotation.model");
const { Selector } = require("../../models/annotation/selector.model");

const AnnotationController = {
  createAnnotation: async function (req, res) {
    try {
      const { context, type, body, target, id } = req.body;
      const annotation = await AnnotationModel.createAnnotation(
        context,
        type,
        body,
        target,
        id
      );
      return res.status(201).json({ annotation });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  getAnnotation: async function (req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const annotation = await AnnotationModel.Annotation.find({
        id,
      })
        .populate({
          path: "body",
          populate: { path: "creator", select: { name: 1 } },
        })
        .populate({
          path: "target",
          populate: {
            path: "selector",
            model: Selector,
          },
        })
        .exec();
      if (!annotation) {
        return res
          .status(404)
          .json({ message: "The annotation does not exist!" });
      }
      return res.status(200).json({ annotation });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = AnnotationController;
