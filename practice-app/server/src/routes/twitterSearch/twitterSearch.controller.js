const axios = require("axios");
const res = require("express/lib/response");
const needle = require('needle')



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
        const stream = needle.get(url, {
            headers: {
                "User-Agent": "v2FilterStreamJS",
                'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        });

        stream.on('data', data => {
            try {
                const json = JSON.parse(data);
                const tweet = json.data

                console.log(json);
                res.write(JSON.stringify(tweet) + '\n')

            } catch (e) {
                console.log(e);
            }
        }).on('err', error =>
            res.end()
        );
        req.on('close', () => {
            try {
                stream.removeAllListeners()
                stream.request.end()
                stream.abort()
            } catch (error) {
                console.log(error);
            }
        })
    }
}

module.exports = TwitterSearchController