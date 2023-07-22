let bookingModel = require("../models/bookingModel");
let userModel = require("../models/userModel");
let constants = require("../utils/constants");


let createBooking = async (req, res) => {
    try {

        let { customerId, movieId, theatreId } = req.body;

        if (!customerId) {
            let user = await userModel.findOne({
                  userId:req.userId
            }).select({ _id: 1 })
            
            customerId = user._id;
            
        }

        let booking = await bookingModel.create({
            customerId: customerId,
            theatreId: theatreId,
            movieId:movieId
        })

       
            res.status(200).send(booking)
        
        
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
}

let updateBooking = async (req, res) => {
    try {
        let updatePassed = req.body;

        let booking = await bookingModel.findOne({
            _id:req.params.bookingId
        }).select({status:1,_id:0})

        if (!booking) {
            return res.status(400).send({
                message:"Invalid booking id! no booking exist"
            })
        }

        let caller = await userModel.findOne({
            userId:req.userId
        }).select({userType:1,_id:0})

        if (booking.status == constants.bookingStatus.completed && caller.userType==constants.userType.customer) {
            return res.status(200).send({
                message:"you can't update booking as the status is completed"
            })
        }

        let updatedBooking = await bookingModel.findOneAndUpdate({
            _id:req.params.bookingId
        }, updatePassed, { new: true })
        

        if (updatedBooking) {
            res.status(200).send(updatedBooking)
        } else {
            res.status(400).send({
                message:"booking can't be updated ,some issue occurred"
            })
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getAllBooking = async (req, res) => {
    try {
      
        let allBooking;

        let caller = await userModel.findOne({
            userId: req.userId
        }).select({ userType: 1 })

        if(caller.userType==constants.userType.admin){
            allBooking= await bookingModel.find()
        } else {
            allBooking = await bookingModel.find({
                customerId:caller._id
            })
        }


        if (allBooking.length > 0) {
            res.status(200).send(allBooking)
        } else {
            res.status(200).send({
                message:"No booking exist to show"
            })
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getBookingById = async (req, res) => {
    try {
 
        let booking = await bookingModel.findOne({
            _id: req.params.bookingId
        })

        if (!booking) {
            return res.status(400).send({
                message: "Invalid booking id! no booking exist"
            })
        }

        res.status(200).send(booking)

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let deleteBooking = async (req, res) => {
    try {

        let booking = await bookingModel.findOne({
            _id: req.params.bookingId
        })

        if (!booking) {
            return res.status(400).send({
                message: "Invalid booking id! no booking exist"
            })
        }

        let confirmation = await bookingModel.deleteOne({
            _id:req.params.bookingId
        })

        if (confirmation.deletedCount > 0) {
            res.status(200).send({...confirmation,message:"booking with above id has been removed from the database"})
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

module.exports = {
    createBooking,
    updateBooking,
    getAllBooking,
    getBookingById,
    deleteBooking
}