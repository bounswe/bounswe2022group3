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

<<<<<<< HEAD
module.exports = { Badge, createBadge, getBadge };
=======
module.exports = { Badge, createBadge, getBadge };
>>>>>>> a03abe4bb527745839e800de5aae6e1373ee7a1a
