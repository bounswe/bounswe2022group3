const MovieModel = require("../../models/movies/movies.model");
const axios = require("axios")
require("dotenv").config();

const MovieController = {

    list: async function (req, res) {
        if (req.query.email) {
            const watchlist = await MovieModel.getWatchlistByEmail(req.query.email);
            if (watchlist) {
                res.status(200).json({
                    watchlist: watchlist,
                })
            } else {
                res.status(410).json({
                    error: "Resource not available."
                })
            }
        } else {
            res.status(400).json({
               error: "Email not specified." 
            })
        }
    },

    add: async function (req, res) {
        try {
            const email = req.query.email
            url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_TOKEN}&query=${req.query.title}`
            const response = (await axios.get(url)).data['results'][0];
            await MovieModel.addMovieToWatchlist(
                response.id,
                response.original_title,
                response.overview,
                response.release_date,
                response.vote_average,
                email
                );

            res.status(201).json({
                message: "Successfully added."
            });
        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "No such movie."
            })
        }
    },

    results: async function(req, res) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_TOKEN}&query=${req.query.keyword}`
        console.log(req.query.keyword)

        const response = (await axios.get(url)).data;
        return res.status(200).json({
            results: response['results']
        })
    }
};

module.exports = MovieController;