const mongoose = require("mongoose");

const annotationSchema = new mongoose.Schema(
  {
    "@context": {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    body: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Body",
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Target",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Annotation = mongoose.model("Annotation", annotationSchema);

const createAnnotation = async (context, type, body, target) => {
  var annotation = new Annotation({
    "@context": context,
    type,
    body,
    target,
  });
  const res = await annotation.save();
  return res;
};

const deleteAnnotation = async (_id) => {
  const res = await Annotation.findOneAndDelete({ _id });
  return res;
};

module.exports = {
  Annotation,
  createAnnotation,
  deleteAnnotation,
};
