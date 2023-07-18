

let createTheatre = async (req, res) => {

    try {

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let updateTheatre = async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let getAllTheatres = async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let getTheatreById = async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let deleteTheatre = async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getAllMoviesInTheatre = async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })

    }
}

let updateMoviesInTheatre= async (req, res) => {
  
    try {
        
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }

}

module.exports = { 
    createTheatre,
    updateTheatre,
    getAllTheatres,
    getTheatreById,
    deleteTheatre,
    getAllMoviesInTheatre,
    updateMoviesInTheatre
}