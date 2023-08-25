
let { signup, signin } = require('../controllers/authController');
let validateSignup = require("../middlewares/validateSignup")


module.exports = (app) => {
    
    app.post("/movieBooking/api/v1/auth/signup",validateSignup,signup)
    app.post("/movieBooking/api/v1/auth/signin",signin)
}