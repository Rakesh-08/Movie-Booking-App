let {
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser
} = require("../controllers/userController");

let {verifyToken,validAuthorisationToUserRoutes} = require("../middlewares/authJwt")

module.exports = (app) => {
    
    app.put("/movieBooking/api/v1/user/:userId", [verifyToken, validAuthorisationToUserRoutes],updateUser)
    app.get("/movieBooking/api/v1/users", [verifyToken, validAuthorisationToUserRoutes],getAllUsers)
    app.get("/movieBooking/api/v1/user/:userId", [verifyToken, validAuthorisationToUserRoutes],getUserById  )
    app.delete("/movieBooking/api/v1/user/:userId", [verifyToken, validAuthorisationToUserRoutes],deleteUser)
}





