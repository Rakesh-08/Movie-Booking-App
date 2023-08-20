let constants= require("../utils/constants")
const bookingModel = require("../models/bookingModel");
let paymentModel = require("../models/paymentModel");
let sendEmail = require("../utils/notificationClient");


let createPayment = async (req, res, next) => {
    try {
        let { bookingId} = req.body;

        let booking = await bookingModel.findOne({
            _id:bookingId
        })
        
        if (!booking) {
            return res.status(400).send({
                message:"Invalid booking id , can't create payment for undefined booking "
            })
        }

        let bookingTime = booking.createdAt;
        let currentTime = Date.now();

        let diff = Math.floor((currentTime - bookingTime) / 1000 * 60)
        
        if (diff > 5) {
            booking.status = constants.bookingStatus.expired;
            await booking.save();
            return res.status(400).send({
                message:"TimeOut ! can't make payment, please try again with new booking"
            })
        }

        let amount= (booking.NoOfTickets)*(booking.pricePerTicket)

        let payment = await paymentModel.create({
            bookingId: bookingId,
            amount: amount,
            paymentStatus:constants.paymentStatus.success
        })

        booking.status = constants.bookingStatus.completed;
        await booking.save();

        let user = await userModel.findOne({
              _id:booking.customerId,
        })

        sendEmail(payment._id,"Payment successfull for booking Id:" + booking._id,JSON.stringify(booking),[user.email],"mba-no-reply-@gmail.com")


        res.status(200).send(payment);

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
}


let updatePayment = async (req, res, next) => {
    try {
        let updatePassed = req.body;

        let payment = await paymentModel.findOne({
            _id:req.params.paymentId
        })

        let booking = await bookingModel.findOne({
            _id:payment.bookingId
        })



        if (!Object.values(constants.paymentStatus).includes(updatePassed.paymentStatus)) {
            return res.status(400).send({
                message: "please pass valid  status to update payment status"
            })
        }
        if (!payment) {
            return res.status(400).send({
                message:"please pass valid payment id to update payment "
            })
        }



        let updatedPayment = await paymentModel.findOneAndUpdate({
            _id:req.params.paymentId
        }, updatePassed, { new: true })
        
        if (updatedPayment) {
           
            if (updatedPayment.paymentStatus == constants.paymentStatus.paid) {

                booking.status=constants.bookingStatus.completed
            } else {
                
                booking.status=constants.bookingStatus.inProgress
            }

            await booking.save();
            res.status(200).send(updatedPayment)
        }


    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}


let getAllPayment = async (req, res, next) => {
    try {
        let query = {};

        if (req.query.paymentStatus) {
            query.paymentStatus = req.query.paymentStatus
        }

        let allPayments = await paymentModel.find(query)
        
        if (allPayments.length > 0) {
            res.status(200).send(allPayments)
        } else {
            res.status(200).send({
                message:"No payments to Show"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}


let getPaymentById = async (req, res, next) => {
    try {
        let payment = await paymentModel.findOne({
            _id: req.params.paymentId
        })

        if (!payment) {
            return res.status(400).send({
                message: "please pass valid payment id to get payment data "
            })
        }

        res.status(200).send(payment)

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}


let deletePayment = async (req, res, next) => {
    try {
        let payment = await paymentModel.findOne({
            _id: req.params.paymentId
        })

        if (!payment) {
            return res.status(400).send({
                message: "the payment you want to delete doesn't exist"
            })
        }

        let acknowledge = await paymentModel.deleteOne({
            _id:req.params.paymentId
        })

        if (acknowledge.deletedCount > 0) {
            res.status(200).send({message:`payment with id ${req.params.paymentId} is deleted successfully`})
        } else {
            res.status(400).send({
                message:"can't delete payment due to some issue"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

module.exports = {
    createPayment,
    updatePayment,
    getAllPayment,
    getPaymentById,
    deletePayment
}