let {
    createMovie,
    updateMovie,
    getAllMovies,
    getMovieById,
    deleteMovie
} = require("../controllers/movieController");
const { validateMovieBody } = require("../middlewares/validateMovieBody");


module.exports = (app)=>{
      
    app.post("/movieBooking/api/v1/movies", [validateMovieBody], createMovie);
    app.put("/movieBooking/api/v1/movies/:movieId", updateMovie);
    app.get("/movieBooking/api/v1/movies",getAllMovies);
    app.get("/movieBooking/api/v1/movies/:movieId",getMovieById);
    app.delete("/movieBooking/api/v1/movies/:movieId",deleteMovie);

}
