const mongoose = require("mongoose");

const annotationSchema = new mongoose.Schema(
  {
    "@context": String,
    type: String,
    body: [
      {
        _id: false,
        purpose: String,
        type: String,
        value: String,
        creator: {
          _id: false,
          id: String,
          name: String,
        },
        created: String,
        modified: String,
      },
    ],
    target: {
      selector: [
        {
          _id: false,
          type: String,
          exact: String,
          start: Number,
          end: Number,
        },
      ],
    },
    id: String,
    resource: {
      $type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
  },
  { typeKey: "$type" }
);

const Annotation = mongoose.model("Annotation", annotationSchema);

const createAnnotation = async (context, type, body, target, id, resource) => {
  var annotation = new Annotation({
    "@context": context,
    type,
    body,
    target,
    id,
    resource,
  });
  const res = await annotation.save();
  return res;
};

const updateAnnotation = async (id, body) => {
  const filter = { id };
  const update = { body };
  const res = await Annotation.findOneAndUpdate(filter, update);
  return res;
};

const deleteAnnotation = async (id) => {
  const res = await Annotation.findOneAndDelete({ id });
  return res;
};

module.exports = {
  Annotation,
  createAnnotation,
  updateAnnotation,
  deleteAnnotation,
};
