
module.exports = async (req, res, next) => {
    
    //validate theatre name
    if (!req.body.name) {
        return res.status(400).send({
            message:"please pass the name of theatre"
        })
    }

    //validate theatre description
    if (!req.body.description) {
        return res.status(400).send({
            message: "please put some brief description about theatre"
        })
    }

    //validate theatre city
    if (!req.body.city) {
        return res.status(400).send({
            message: "please mention the city in which theatre is"
        })
    }

    //validate pincode of the theatres city
    if (!req.body.pincode) {
        return res.status(400).send({
            message: "please pass the pincode of the city"
        })
    }
   
    // validate base price for the theatre

    if (!req.body.basePrice) {
        return res.status(400).send({
            message:"please mention the base price for this theatre"
        })
    }

    if (!req.body.ownerId) {
        return res.status(400).send({
            message: "owner Id is missing for this theatre"
        })
    }
    next();
}