let movieModel= require("../models/movieModel");
const theatreModel = require("../models/theatreModel");
let constants = require("../utils/constants");

let createMovie = async (req, res) => {

    try {
    let obj = req.body;

        let movie = await movieModel.create(obj)

        res.status(200).send(movie)
    } catch (err) {
        console.log(err);
        res.status(500).send({message:"some internal server error occurred"})
    }


}

let updateMovie = async (req, res) => {
    try {

        let update = req.body;

        if (update.releaseStatus) {

            if (!Object.values(constants.ReleaseStatus).includes(update.releaseStatus)) {
                return res.status(400).send({
                    message:"please pass valid release status for the movie"
                })
            }
            
        }

        let updatedMovie = await movieModel.findOneAndUpdate({
              _id:req.params.movieId
        }, update, {
            new:true
        })

        if (updateMovie) {
            res.status(200).send(updatedMovie);
        } else {
            res.status(400).send({
                message:"no movie exist with given id"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "some internal server error occurred" })
    }

}

let getAllMovies = async (req, res) => {
    try {

        let query = {}
        let {language,genre}=req.query
        
        if (language) {
            query.language = language;
        }

        if (genre) {
            query.genre = genre;
        }

        let allMovies = await movieModel.find(query)
        
            res.status(200).send(allMovies)
        

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "some internal server error occurred" })
    }

}

let getMovieById = async (req, res) => {
    try {

        let movie = await movieModel.findOne({
            _id:req.params.movieId
        })

        if (movie) {
            res.status(200).send(movie);
        } else {
            res.status(400).send({
                message:"invalid movie id , no movie exist for given id"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "some internal server error occurred" })
    }

}


let deleteMovie = async (req, res) => {

    try {
  
        // check the id is valid or not
        let temp = await movieModel.findOne(
            {_id:req.params.movieId}
        )

        if (!temp) {
            return res.status(400).send({
                message:"invalid request ! no movie exist with given id"
            })
        }

        // fetch all the theatres whose screening includes this movie

        let theatres = await theatreModel.find({
            movies:req.params.movieId
        }).select({ movies: 1 })
        
        // remove this movie from the list of movies for the theatres
        theatres.map(obj => {
            obj.movies = obj.movies.filter(id => id !== req.params.movieId)
        });

        await theatres.save()

        let acknowledged= await movieModel.deleteOne({
              _id:req.params.movieId
        })
        
        res.status(200).send({...acknowledged,message:"movie with id  passed is removed from the theatres"})

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "some internal server error occurred" })
    }
}

module.exports = {
    createMovie,
    updateMovie,
    getAllMovies,
    getMovieById,
    deleteMovie
}