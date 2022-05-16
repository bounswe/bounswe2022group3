const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    date: { type: Date },
    text: { type: String },
    author_id: { type: String },
    tag: { type: String },
});
TweetSchema.index({ "id": 1 }, { unique: true })

const Tweet = mongoose.model("Tweet", TweetSchema)
subtractMinutes = (numOfMinutes, date = new Date()) => {
    date.setMinutes(date.getMinutes() - numOfMinutes);
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${hour}:${minute}`
}
const getTweets = async (x) => {
    const a = await Tweet.aggregate([
        {
            $project: {
                tag: 1, _id: 1, date: 1, text: 1,
            }
        },
        {
            $set: {
                diff: { $dateDiff: { startDate: "$$NOW", endDate: "$date", unit: "minute" } },
                length: { $strLenCP: "$text" },
                numberOfWords: {
                    $size: { $split: ["$text", " "] }
                }
            }
        },
        {
            $facet: {
                0: [
                    { $match: { diff: { $eq: -0 } } },
                    {
                        $group: {
                            _id: "$tag", averageLength: { $avg: "$length" }, avgNumberOfWords: { $avg: "$numberOfWords" }
                        }
                    },
                ],
                1: [
                    { $match: { diff: { $eq: -1 } } },
                    {
                        $group: {
                            _id: "$tag", averageLength: { $avg: "$length" }, avgNumberOfWords: { $avg: "$numberOfWords" }
                        }
                    },],
                2: [
                    { $match: { diff: { $eq: -2 } } },
                    {
                        $group: {
                            _id: "$tag", averageLength: { $avg: "$length" }, avgNumberOfWords: { $avg: "$numberOfWords" }
                        }
                    },],
                3: [
                    { $match: { diff: { $eq: -3 } } },
                    {
                        $group: {
                            _id: "$tag", averageLength: { $avg: "$length" }, avgNumberOfWords: { $avg: "$numberOfWords" }
                        }
                    },],
                4: [
                    { $match: { diff: { $eq: -4 } } },
                    {
                        $group: {
                            _id: "$tag", averageLength: { $avg: "$length" }, avgNumberOfWords: { $avg: "$numberOfWords" }
                        }
                    },],
                5: [
                    { $match: { diff: { $eq: -5 } } },
                    {
                        $group: {
                            _id: "$tag", averageLength: { $avg: "$length" }, avgNumberOfWords: { $avg: "$numberOfWords" }
                        }
                    },],
                6: [
                    { $match: { diff: { $eq: -6 } } },
                    {
                        $group: {
                            _id: "$tag", averageLength: { $avg: "$length" }, avgNumberOfWords: { $avg: "$numberOfWords" }
                        }
                    },],
                7: [
                    { $match: { diff: { $eq: -7 } } },
                    {
                        $group: {
                            _id: "$tag", averageLength: { $avg: "$length" }, avgNumberOfWords: { $avg: "$numberOfWords" }
                        }
                    },],
                8: [
                    { $match: { diff: { $eq: -8 } } },
                    {
                        $group: {
                            _id: "$tag", averageLength: { $avg: "$length" }, avgNumberOfWords: { $avg: "$numberOfWords" }
                        }
                    },],
                9: [
                    { $match: { diff: { $eq: -9 } } },
                    {
                        $group: {
                            _id: "$tag", averageLength: { $avg: "$length" }, avgNumberOfWords: { $avg: "$numberOfWords" }
                        }
                    },],
            }
        },
    ]);
    const res = a[0]
    const averageLengths = []
    const averageWordCounts = []
    for (const minute in res) {
        let x = { name: subtractMinutes(parseInt(minute)) }
        for (const i of res[minute]) {
            x[i._id] = i.averageLength.toFixed(2);
        }
        averageLengths.push(x)
    }
    for (const minute in res) {
        let x = { name: subtractMinutes(parseInt(minute)) }
        for (const i of res[minute]) {
            x[i._id] = i.avgNumberOfWords.toFixed(2);
        }
        averageWordCounts.push(x)
    }
    return { averageLengths: averageLengths.reverse(), averageWordCounts: averageWordCounts.reverse(), tags: x }

}

module.exports = { Tweet, getTweets }
