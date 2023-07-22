let {
    createPayment,
    updatePayment,
    getAllPayment,
    getPaymentById,
    deletePayment
} = require("../controllers/paymentController");
let { verifyToken,IsAdmin } = require("../middlewares/authJwt");
let paymentValidator = require("../middlewares/validatePayment");

module.exports = (app) => {
    
    app.post("/movieBooking/api/v1/booking/payment", [verifyToken, paymentValidator], createPayment);
    app.put("/movieBooking/api/v1/booking/payment/:paymentId", verifyToken, updatePayment)
    app.get("/movieBooking/api/v1/booking/payments", verifyToken, getAllPayment)
    app.get("/movieBooking/api/v1/booking/payment/:paymentId", verifyToken, getPaymentById)
    app.delete("/movieBooking/api/v1/booking/payment/:paymentId", verifyToken, deletePayment)
}