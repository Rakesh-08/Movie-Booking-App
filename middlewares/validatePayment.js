const bookingModel = require("../models/bookingModel")


module.exports = async (req, res, next) => {
    
    // payment creation request should  have the booking id

    if (!req.body.bookingId) {
        return res.status(400).send({
            message:"please pass the booking id for which payment need to be done"
        })
    }


    next()
}