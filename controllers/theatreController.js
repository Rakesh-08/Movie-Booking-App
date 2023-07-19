let theatreModel = require("../models/theatreModel");
let moviesModel = require("../models/movieModel");

let createTheatre = async (req, res) => {

    try {
        let theatreBody = req.body;

        let theatre = await theatreModel.create(theatreBody);
        res.status(200).send(theatre)

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let updateTheatre = async (req, res) => {
    try {

        let updatePassed = req.body;

        let updatedTheatre = await theatreModel.findOneAndUpdate({
            _id: req.params.theatreId
        }, updatePassed, { new: true });

        if (updatedTheatre) {
            res.status(200).send(updatedTheatre)
        } else {
            res.status(400).send({
                message:"No theatre exist with given theatre id"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let getAllTheatres = async (req, res) => {
    try {

        let query = {};
        let { pincode, city, name, movieId } = req.query
        
        if (name != undefined) {
            query.name=name
        }

        if (pincode!=undefined) {
            query.pincode=pincode
        }

        if (city != undefined) {
            query.city= {$regex:city}
        }

        let allTheatres = await theatreModel.find(query);

        if (movieId != undefined) {
            allTheatres=allTheatres.filter(i=>i.movies.includes(movieId))
        }

        if (allTheatres.length > 0) {
            res.status(200).send(allTheatres)
        } else {
            res.status(400).send({
                message: "No theatres exist "
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let getTheatreById = async (req, res) => {
    try {

        let theatre = await theatreModel.findOne({
            _id:req.params.theatreId
        })

        if (theatre) {
            res.status(200).send(theatre)
        } else {
            res.status(400).send({
                message:"Invalid theatre id , no theatre exist "
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let deleteTheatre = async (req, res) => {
    try {
        let isValidTheatreId = await theatreModel.findOne({
                _id:req.params.theatreId
        })
        
        if (!isValidTheatreId) {
            return res.status(400).send({
            message:"Invalid theatre Id ! no theatre exist with given id"
            })
        }
        await theatreModel.deleteOne({
            _id:req.params.theatreId
        })

        res.status(200).send({
            message:'successfully removed theatre from the database'
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let addMoviesInTheatre = async (req, res) => {
  
    try {

        let { moviesId } = req.body;

        if (moviesId == undefined||moviesId.length<1) {
            return res.status(400).send({
                message:"please add the moviesId to be added"
            })
        }

        let theatre = await theatreModel.findOne({
            _id: req.params.theatreId
        })

        if (!theatre) {
            return res.status(400).send({
                message: "Invalid theatre id , no theatre exist with given id"
            })
        }
    
        // validate movies id to be inserted
        let validateMoviesId = await moviesModel.find({
            _id: {
                $in: moviesId
            }
        }).select({ _id: 1 });

        moviesId.length = 0;
        validateMoviesId.forEach(e => {
            if (!theatre.movies.includes(e._id)) {
                moviesId.push( e._id) 
            }
            
        });
  
        

        theatre.movies.push(...moviesId)
        await theatre.save();

        res.status(200).send({
            message:"movies added into this theatre"
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }

}

let removeMoviesFromTheatre = async (req, res) => {
    try {

        let moviesIdToBeRemoved = req.body.moviesId;

        if (moviesIdToBeRemoved == undefined || moviesIdToBeRemoved.length < 1) {
            return res.status(400).send({
                message: "please mention the movies id to be removed"
            })
        }


        let theatre = await theatreModel.findOne({
            _id: req.params.theatreId
        });

        if (!theatre) {
            return res.status(400).send({
                message:"please pass valid theatre id , no theatre exist for this given id"
            })
        }
            
        
        theatre.movies = theatre.movies.filter(id => !moviesIdToBeRemoved.includes(id.toString()))
        await theatre.save();



        res.status(200).send(theatre.movies)
        

    } catch (err) {
        console.log(err)
        res.status(500).send({message:"some internale server error occurred"})
    }
}

let getAllMoviesInTheatre = async (req, res) => {
    try {

        let theatre = await theatreModel.findOne({
            _id: req.params.theatreId
        }).select({ _id: 0, movies: 1 });

        if (!theatre) {
            return res.status(400).send({
                message:"Invalid theatre id , no theatre exist with given id"
            })
        }

        let allMovies = await moviesModel.find({
            _id: {
                $in:theatre.movies
            }
        })

        if (req.query.movieId != undefined) {
              allMovies=allMovies.filter(i=>i._id==req.query.movieId)
        }

        if (allMovies.length > 0) {
            res.status(200).send(allMovies)
        } else {
            res.status(400).send(
                {
                    message: "No movies exist in this theatre"
                }
            )
        }



    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })

    }
}

module.exports = { 
    createTheatre,
    updateTheatre,
    getAllTheatres,
    getTheatreById,
    deleteTheatre,
    getAllMoviesInTheatre,
    addMoviesInTheatre,
    removeMoviesFromTheatre
}