let {
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser
} = require("../controllers/userController");

let {verifyToken,validAuthorisation} = require("../middlewares/authJwt")

module.exports = (app) => {
    
    app.put("/movieBooking/api/v1/user/:userId",[verifyToken,validAuthorisation],updateUser)
    app.get("/movieBooking/api/v1/users", [verifyToken, validAuthorisation],getAllUsers)
    app.get("/movieBooking/api/v1/user/:userId", [verifyToken, validAuthorisation],getUserById  )
    app.delete("/movieBooking/api/v1/user/:userId", [verifyToken, validAuthorisation],deleteUser)
}





