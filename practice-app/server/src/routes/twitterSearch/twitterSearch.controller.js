const axios = require("axios");
const TweetModel = require("../../models/tweet/tweet.model")
const request = require('request');


const API_URL = 'https://api.twitter.com/2'

const defineRule = (hashtag, has_image, lang) => {
    // Insert # if not provided 
    if (hashtag.length > 0 && hashtag[0] != '#')
        hashtag = `#${hashtag}`
    let rule = hashtag
    if (has_image)
        rule += ` has:images`
    if (lang)
        rule += ` lang:${lang}`
    const tag = `${hashtag} in ${lang}${has_image ? ' that has image(s)' : ''}`
    return { rule, tag }
}

const TwitterSearchController = {
    getRules: async (req, res) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            }
        };
        const response = (await axios.get(`${API_URL}/tweets/search/stream/rules`, options)).data;
        console.log(response);
        res.status(200).json(
            response.data.map(e => e.value)
        )

    },
    createRule: async (req, res) => {
        try {
            const { hashtag, has_image, lang } = req.body;
            let { rule, tag } = defineRule(hashtag, has_image, lang)
            const payload = {
                "add": [
                    {
                        value: rule,
                        tag: tag
                    }
                ]
            }
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
                }
            };
            const response = (await axios.post(`${API_URL}/tweets/search/stream/rules`, payload, options)).data;
            const meta = response.meta
            if (meta.summary.created != 1) {
                res.status(400).json({
                    message: "Could not create a rule with the parameters you provided.",
                })
            }
            res.status(201).json({
                message: `Created a rule with tag \'${tag}\'`,
                tag
            })
        } catch (error) {
            console.log(error.toString());
        }
    },
    listenStream: async (req, res) => {
        const url = "https://api.twitter.com/2/tweets/search/stream?tweet.fields=created_at&expansions=author_id&user.fields=created_at"
        try {
            const stream = request({
                method: "GET",
                url: url,
                json: true,
                forever: false,
                headers: {
                    'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
                },
            }).on("data", (data) => {
                const json = JSON.parse(data);
                const { tag } = json.matching_rules[0]
                const tweet = json.data
                console.log(tweet);
                const tweetObject = new TweetModel({
                    id: tweet.id,
                    date: tweet.created_at,
                    text: tweet.text,
                    author_id: tweet.author_id,
                    tag,
                })
                tweetObject.save()
                // res.write(JSON.stringify(tweet) + '\n')
            });

            res.status(200).json({ message: "Will listern for 20 seconds" })
            setTimeout(() => {
                stream.abort()
            }, 20000);
        } catch (error) {
            console.log(error);
        }
    },
    getTweets: async (req, res) => {
        const { tag } = req.query
        const tweets = await TweetModel.find({ tag }, { "__v": 0, "_id": 0 }).lean()
        res.status(200).json(tweets)
    }
}

module.exports = TwitterSearchController