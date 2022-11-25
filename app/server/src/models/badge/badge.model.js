const mongoose = require("mongoose");

const badgesSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

const Badge = mongoose.model("Badge", badgesSchema);

const createBadge = async (title, description) => {
  var topic = new Badge({ title: title, description: description });
  const res = await topic.save();
  return res;
};

const getBadge = async (id) => {
  var badge = Badge.findById(id);
  return badge;
};

module.exports = { Badge, createBadge, getBadge };
