let jwt = require("jsonwebtoken");
const { secretKey } = require("../configs/authConfig");
let userModel = require("../models/userModel");
let constants= require("../utils/constants")

module.exports.verifyToken =async (req, res, next) => {
    
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(400).send({
            message:"please pass the token along with http request"
        })
    }


    jwt.verify(token, secretKey, (err, decoded) => {

        if (err) {
            return res.status(401).send({
                message:"Invalid Token! please enter correct token"
            })
        }

        req.userId = decoded.id;
        
    })

    next()


}

module.exports.validAuthorisation = async (req, res, next) => {
    
    try {

        let requester = await userModel.findOne({
            userId: req.userId
        })

        let isAdmin = null;

        if (requester.userType == constants.userType.admin && requester.userStatus == constants.userStatus.approved) {
            isAdmin = requester;
        }

        if (!(isAdmin || requester._id == req.params.userId)) {
            return res.status(401).send({
                message:"unauthorised request! you are not allowed to make request to this route"
            })
        }
        next();
                 
    } catch (err) {
        console.log(err);
       return res.status(500).send({
            message:"some internal server error occurred"
        })
             }
}