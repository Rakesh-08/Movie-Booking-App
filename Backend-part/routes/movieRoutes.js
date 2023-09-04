let {
    createMovie,
    updateMovie,
    getAllMovies,
    getMovieById,
    deleteMovie,
    getAllMoviesRunningInTheatreOwned
} = require("../controllers/movieController");
const { validateMovieBody } = require("../middlewares/validateMovieBody");
const {verifyToken,IsAdmin } = require("../middlewares/authJwt")

module.exports = (app)=>{
      
    app.post("/movieBooking/api/v1/movies", [ verifyToken,IsAdmin, validateMovieBody], createMovie);
    app.put("/movieBooking/api/v1/movies/:movieId", [verifyToken, IsAdmin], updateMovie);
    app.get("/movieBooking/api/v1/movies",getAllMovies);
    app.get("/movieBooking/api/v1/movies/:movieId", getMovieById);
    app.get("/movieBooking/api/v1/moviesInTheatre",verifyToken, getAllMoviesRunningInTheatreOwned);
    app.delete("/movieBooking/api/v1/movies/:movieId", [verifyToken, IsAdmin],deleteMovie);

}
