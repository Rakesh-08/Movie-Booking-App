let userModel = require("../models/userModel");
let theatreModel = require("../models/theatreModel");
let movieModel = require("../models/movieModel");

module.exports = async (req, res, next) => {
    
    let { customerId, theatreId, movieId } = req.body;

   // validate the customerId
    
    let user = await userModel.findOne({
        userId:req.userId
    })

    if (user.userType !== "CUSTOMER") {
        
        if (!customerId) {
            return res.status(400).send({
                message:"please pass the customer id who is booking movie"
            })
        }


        let customer = await userModel.findOne({
            _id: customerId
        })

        if (customerId && !customer) {
            return res.status(400).send({
                message: "Invalid Customer id ! no customer exist with this id"
            })
        }
    }
    

    // validate the theatreId

    if (!theatreId) {
        return res.status(400).send({
            message: "please pass the theatre id"
        })
    }

    let theatre = await theatreModel.findOne({
        _id: theatreId
    })


    if (!theatre) {
        return res.status(400).send({
            message: "Invalid Theatre id ! no theatre exist with this id"
        })
    }

    // validate the movie id

    if (!movieId) {
        return res.status(400).send({
            message: "please pass the movie id"
        })
    }

    if (!theatre.movies.includes(movieId)) {
        return res.status(400).send({
            message:"Movie you want to see is not scheduled in this theatre, try with some other movie"
        })
    }

    let movie = await movieModel.findOne({
        _id: movieId
    })

    if (!movie) {
        return res.status(400).send({
            message: "Invalid movie id ! no movie exist with this id"
        })
    }
  

    // validate the no. of tickets need to be booked

    if (!req.body.NoOfTickets) {
        return res.status(400).send({
            message:"please mention how many tickets do you want to book"
        })
    }

    // validate the timing of the tickets

    if (!req.body.Timing) {
        return res.status(400).send({
            message: "please book the timing slot of the movie"
        })
    }
    next();
}

