

module.exports = async (req, res, next) => {
    
    // payment model should have the booking id

    if (!req.body.bookingId) {
        return res.status(400).send({
            message:"please pass the booking id for which payment need to be done"
        })
    }

    // validate amount of the payment
    if (!req.body.amount) {
        return res.status(400).send({
            message:"please mention the amount of payment"
        })
    }
    
}