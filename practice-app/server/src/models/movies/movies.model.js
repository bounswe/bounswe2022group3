const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    id: {
        type: String, 
        unique: true, 
        required: true
    },
    title: {
        type: String,
        required: true
    },
    overview:{
        type: String
    },
    release_date: {
        type: String
    },
    vote_average: {
        type: String
    },
    email: {
        type: String,
        required: true
    }
});
const Movie = mongoose.model('Movie', movieSchema);

const getWatchlistByEmail = async (email) => {
    return await Movie.find( { email: email });
}

const addMovieToWatchlist = async (
    id,
    title,
    overview,
    release_date,
    vote_average,
    email
) => {
    const item = {
        id: id,
        title: title,
        overview: overview,
        release_date: release_date,
        vote_average: vote_average,
        email: email
    }
    const movie = new Movie(item);
    movie.save()
}

module.exports = {
    Movie,
    getWatchlistByEmail,
    addMovieToWatchlist
};