const Lyrics = require("../../models/lyrics/lyrics.model");
const axios = require("axios");
const { response } = require("express");
const mongoose = require('mongoose');
const { use } = require("./lyrics.route");

const LyricsController = {
    searchLyrics: async function (req, res) {
        // Get user input
        const { searchparameter } = req.body;

        if (searchparameter === "") {
            return res
                .status(400)
                .json({ message: "Please enter a search parameter" })
        }

        // const options = {
        //     method: 'GET',
        //     url: 'https://genius.p.rapidapi.com/search',
        //     params: {q: searchparameter},
        //     headers: {
        //       'X-RapidAPI-Host': 'genius.p.rapidapi.com',
        //       'X-RapidAPI-Key': `${process.env.GENIUS_TOKEN}`
        //     }
        // };

        const url = 'https://genius.p.rapidapi.com/search';

        const headers = {
            headers: {
                'X-RapidAPI-Host': 'genius.p.rapidapi.com',
                'X-RapidAPI-Key': `${process.env.GENIUS_TOKEN}`
            }
        }

        try {
            const searchUrl = url + "?q=" + searchparameter
            const resp = (await axios.get(searchUrl, headers)).data;
            // axios.request(options).then(function (response) {
            //     console.log("response data");
            //     console.log(response.data);
            //     resp = response.data;
            // }).catch(function (error) {
            //     console.error(error);
            // });
            const hits = resp['response']['hits']

            function mappingFunction({ result }) {
                let { full_title: full_title, url: url, id: id } = result;
                return { full_title: full_title, url: url, lyrics_id: id };
            };

            if (resp) {
                return res.status(200).json({
                    searchresult: hits.map(mappingFunction)
                });
            }
        } catch (e) {
            return res
                .status(400)
                .json({ message: "Could not do the search" });
        }
    },
    saveLyrics: async function (req, res) {
        const { lyrics_id, full_title, url } = req.body;

        const save_lyrics = await Lyrics.create({
            user:  mongoose.Types.ObjectId(req.auth),
            lyrics_id: lyrics_id,
            full_title: full_title,
            url: url,
        });
        if (save_lyrics) {
            return res.status(200).json({
                lyrics_id: lyrics_id,
            });
        }
    },
    savedLyrics: async function (req, res) {
        const user_id = req.auth;
        const user_obj_id = mongoose.Types.ObjectId(user_id);
        const saved_lyrics = await Lyrics.find({ user: user_obj_id }, 'user full_title url').exec(); // TODO: This does not work it gives all records.
        console.log("user id is : ", user_id);
        console.log("user obj id is : ", user_obj_id);

        if (saved_lyrics) {
            return res.status(200).json({
                saved_lyrics
            });
        }
    }
};

module.exports = LyricsController;
