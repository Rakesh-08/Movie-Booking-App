let {
    createTheatre,
    updateTheatre,
    getAllTheatres,
    getTheatreById,
    deleteTheatre,
    getAllMoviesInTheatre,
    updateMoviesInTheatre
} = require("../controllers/theatreController");
let theatreBodyValidator = require("../middlewares/validateTheatreBody");

module.exports = (app) => {
    
    app.post("/movieBooking/api/v1/theatres", theatreBodyValidator, createTheatre);
    app.put("/movieBooking/api/v1/theatres/:theatreId",updateTheatre);
    app.get("/movieBooking/api/v1/theatres", getAllTheatres);
    app.get("/movieBooking/api/v1/theatres/:theatreId", getTheatreById);
    app.delete("/movieBooking/api/v1/theatres/:theatreId",deleteTheatre );
    app.put("/movieBooking/api/v1/movies/theatre/:theatreId",updateMoviesInTheatre);
    app.get("/movieBooking/api/v1/movies/theatre/:theatreId",getAllMoviesInTheatre);

}