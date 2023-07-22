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
    let theatre = await theatreModel.findOne({
        _id: theatreId
    })

    if (theatreId&&!theatre) {
        return res.status(400).send({
            message: "Invalid Theatre id ! no theatre exist with this id"
        })
    }

    // validate the movie id
    let movie = await movieModel.findOne({
        _id: movieId
    })

    if (movieId &&!movie) {
        return res.status(400).send({
            message: "Invalid movie id ! no movie exist with this id"
        })
    }

    next();
}

