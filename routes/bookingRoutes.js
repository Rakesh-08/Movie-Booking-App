

let {
    createBooking,
    updateBooking,
    getAllBooking,
    getBookingById,
    deleteBooking
} = require("../controllers/bookingController");
const { verifyToken,authValidatorForBooking } = require("../middlewares/authJwt")
let bookingValidator=require("../middlewares/validateBooking")

module.exports = (app) => {
    
    app.post("/movieBooking/api/v1/booking",[verifyToken,bookingValidator], createBooking)
    app.put("/movieBooking/api/v1/booking/:bookingId", [verifyToken,authValidatorForBooking], updateBooking)
    app.get("/movieBooking/api/v1/booking", [verifyToken], getAllBooking)
    app.get("/movieBooking/api/v1/booking/:bookingId", [verifyToken, authValidatorForBooking], getBookingById)
    app.delete("/movieBooking/api/v1/booking/:bookingId", [verifyToken, authValidatorForBooking], deleteBooking)
}





