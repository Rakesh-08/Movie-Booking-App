

let createPayment = async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
}


let updatePayment = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}


let getAllPayment = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}


let getPaymentById = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}


let deletePayment = async (req, res, next) => {
    try {

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