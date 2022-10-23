const mongoose = require("mongoose");

const badgesSchema = new mongoose.Schema({
  title: String,
  description: String,
})

badgesSchema.set("timestamps", true)
const Badge = mongoose.model("Badge", badgesSchema)

const createBadge = async (title, description) => {
  var chapter = new Badge({ title: title, description: description })
  const res = await chapter.save()
  return res
}

const getBadge = async (id) => {
  var badge = Badge.findById(id)
  return badge
}

module.exports = { Badge, createBadge, getBadge };