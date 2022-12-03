const mongoose = require("mongoose");
const { Body, createBody } = require("./body.model");
const { Selector, createTextQuoteSelector, createTextPositionSelector } = require("./selector.model");
const { Target } = require("./target.model");

const annotationSchema = new mongoose.Schema({
  "@context": {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  body: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Body",
    },
  ],
  target: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Target",
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const Annotation = mongoose.model("Annotation", annotationSchema);

const createAnnotation = async (context, type, body, target, id) => {
  var bodies_l = [];
  for (var body_el of body) {
    var body_t = createBody(
      body_el.purpose,
      body_el.type,
      body_el.value,
      body_el.creator,
      body_el.created,
    );
    await body_t.save();
    bodies_l.push(body_t);
  }
  var selectors_l = [];
  for (var selector_el of target.selector) {
    selector_keys = Object.keys(selector_el);
    if (selector_keys.includes('exact')) {
      var selector_t = createTextQuoteSelector(
        selector_el.type,
        selector_el.exact,
      );
    } else if (selector_keys.includes('start')) {
      var selector_t = createTextPositionSelector(
        selector_el.type,
        selector_el.start,
        selector_el.end,
      );
    }
    await selector_t.save();
    selectors_l.push(selector_t);
  }
  var target_el = new Target({
    selector: selectors_l,
  });
  await target_el.save();
  var annotation = new Annotation({
    "@context": context,
    type,
    body: bodies_l,
    target: target_el,
    id,
  });
  const res = await annotation.save();
  return res;
};

const deleteAnnotation = async (id) => {
  const res = await Annotation.findOneAndDelete({ id });
  return res;
};

module.exports = {
  Annotation,
  createAnnotation,
  deleteAnnotation,
};
