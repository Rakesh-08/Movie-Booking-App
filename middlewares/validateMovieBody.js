let constants= require("../utils/constants")

let validateMovieBody = async (req, res, next) => {
    
    // validate movie name
   if (!req.body.name) {
        return res.status(400).send({
            message:"please pass the name of the movie"
        })
    }

    // validate movie poster
   if (!req.body.posterURL) {
        return res.status(400).send({
            message: "please pass the poster url  of the movie"
        })
    }

    // validate language of the movie
    if (!req.body.language) {
        return res.status(400).send({
            message: "please mention the language of the movie"
        })
    }

    // validate movie genre
    if (!req.body.genre) {
        return res.status(400).send({
            message: "please pass genre of the movie"
        })
    }

    // validate the minimum price for movie

    if (!req.body.price) {
        return res.status(400).send({
            message:"please mention the screen price for the movie"
        })
    }

    // validate movie release status
    if (!req.body.releaseStatus) {
        return res.status(400).send({
            message: "please mention the status of the movie release"
        })
    }

    //  movie release status should be one of the availabel option ; RELEASED, COMING SOON, BLOCKED

    let statusOptions= Object.values(constants.ReleaseStatus)

    if (!statusOptions.includes(req.body.releaseStatus)) {
        return res.status(400).send({
            message: "please pass valid release status of the movie"
        })
    }

    // Director of the movie should pe provided
    if (!req.body.director) {
        return res.status(400).send({
            message: "please pass the director name of the movie"
        })
    }

    next();
}

module.exports = {
    validateMovieBody
}