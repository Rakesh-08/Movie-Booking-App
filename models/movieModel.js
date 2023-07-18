const mongoose = require("mongoose");

let movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    summary: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    trailerURL: {
        type: String,
        required: true
    },
    posterURL: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required:true
    },
    movieLength: {
        type: String,
        required:true
    },
    imdbRating: {
        type: String,
        required:true
    },
    releaseDate: {
        type: Date,
        required: true
    },
   releaseStatus : {
        type: String,
       required: true,
        default:"RELEASED"
    },
    director: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
})


module.exports = mongoose.model("movies", movieSchema);