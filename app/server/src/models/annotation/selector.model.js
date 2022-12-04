const mongoose = require("mongoose");

const selectorSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  exact: {
    type: String,
  },
  start: {
    type: Number,
  },
  end: {
    type: Number,
  },
});

const Selector = mongoose.model("Selector", selectorSchema);

const createTextQuoteSelector = async (type, exact) => {
  var selector = new Selector({
    type,
    exact,
  });
  const res = await selector.save();
  return res;
};

const createTextPositionSelector = async (type, start, end) => {
  var selector = new Selector({
    type,
    start,
    end,
  });
  const res = await selector.save();
  return res;
};

const deleteSelector = async (_id) => {
  const res = await Selector.findOneAndDelete({ _id });
  return res;
};

module.exports = {
  Selector,
  createTextQuoteSelector,
  createTextPositionSelector,
  deleteSelector,
};
