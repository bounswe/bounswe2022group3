const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  chapter_name: String,
  chapter_id: String,
  chapter_badge: { type: mongoose.Schema.Types.ObjectId, ref: "Badge" },
  content: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
})

const Chapter = mongoose.model('Chapter', chapterSchema);

const createChapter = async (chapterName, chapterBadge, contentList) => {
  var chapter = new Chapter({
    chapter_name: chapterName,
    chapter_badge: chapterBadge,
    content: contentList
  })
  chapter.chapter_id = chapter._id
  const res = await chapter.save()
  return res
}


const getPopulatedChapter = async (id) => {
  return Chapter.findById(id)
    .populate("chapter_badge content chapter_name")
    .populate({
      path: 'content',
      populate: {
        path: 'discussion',
        populate: { path: 'comments' }
      }
    })
    .exec()
}

const getChapter = async (id) => {
  return Chapter.findById(id)
}

module.exports = { Chapter, createChapter, getChapter, getPopulatedChapter }