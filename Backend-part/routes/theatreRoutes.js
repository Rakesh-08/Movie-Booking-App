let {
    createTheatre,
    updateTheatre,
    getAllTheatres,
    getTheatreById,
    deleteTheatre,
    getAllMoviesInTheatre,
    addMoviesInTheatre,
    removeMoviesFromTheatre
} = require("../controllers/theatreController");
let theatreBodyValidator = require("../middlewares/validateTheatreBody");
const { verifyToken, IsAdmin,AdminOrClient } = require("../middlewares/authJwt")


module.exports = (app) => {
    
    app.post("/movieBooking/api/v1/theatres", [verifyToken, IsAdmin , theatreBodyValidator], createTheatre);
    
    app.put("/movieBooking/api/v1/theatres/:theatreId", [verifyToken, AdminOrClient], updateTheatre);
    
    app.get("/movieBooking/api/v1/theatres", verifyToken, getAllTheatres);
    
    app.get("/movieBooking/api/v1/theatres/:theatreId", verifyToken, getTheatreById);
    
    app.delete("/movieBooking/api/v1/theatres/:theatreId", [verifyToken, IsAdmin ], deleteTheatre);
    
    app.put("/movieBooking/api/v1/theatres/:theatreId/movies", [verifyToken, AdminOrClient ], addMoviesInTheatre);
    
    app.get("/movieBooking/api/v1/theatres/:theatreId/movies", verifyToken, getAllMoviesInTheatre);
    
    app.put("/movieBooking/api/v1/theatres/:theatreId/removeMovies", [verifyToken,AdminOrClient ],removeMoviesFromTheatre)

}