let userModel = require("../models/userModel");
const constants = require("../utils/constants");
let secureUserResponse = require("../utils/secureUserResponse");

let updateUser = async (req, res) => {

    try {
        let updatePassed = req.body;

        if (Object.keys(updatePassed).includes("userStatus")) {


            if (!Object.values(constants.userStatus).includes(updatePassed.userStatus)) {
                return res.status(400).send({
                    message:"invalid user status passed"
                })
            }
            
            let requestMaker = await userModel.findOne({
                userId: req.userId
            })

            if (requestMaker.userType !== 'ADMIN') {
                return res.status(401).send({
                    message:"unauthorised request , you are not allowed to change the status of the user"
                })
            }
        }
     

        let updatedUser = await userModel.findOneAndUpdate({
            _id: req.params.userId
        }, updatePassed, { new: true })
        
        if (updatedUser) {
            res.status(200).send(secureUserResponse([updatedUser]))
        } else {
            res.status(400).send({
                message:"no user exist with this given id"
            })
        }
        

    } catch (err) {
        console.log(err);
        res.status(500).send({
               message:"some internal server error occurred"
           })
    }
    

}
let getAllUsers = async (req, res) => {
    try {

        let query = {};
        let { userType, userStatus } = req.query;

        if (userType) {
            query.userType = userType;
        }
        if (userStatus) {
            query.userStatus=userStatus
        }

        let allUsers = await userModel.find(query);

        if (allUsers.length > 0) {
            res.status(200).send(secureUserResponse(allUsers))
        } else {
            res.status(200).send({
                message:"no users exist"
            })
        }


    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let getUserById = async (req, res) => {
    try {

        let user = await userModel.findOne({
            _id:req.params.userId
        })

        if (!user) {
            return res.status(400).send({
                message:"No user exist for this given id"
            })
        }

        res.status(200).send(secureUserResponse([user]))


    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let deleteUser = async (req, res) => {
    try {

       let Response= await userModel.deleteOne({
            _id:req.params.userId
       })
        
        if (Response.deletedCount > 0) {
            res.status(200).send({...Response,message:"user with above id has been removed"})
        }
        else {
            res.status(400).send({
                message:"INVALID USERID! no user exist with above id"
            })
        }


    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

module.exports = {
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser
}