let userModel = require("../models/userModel");
let secureUserResponse = require("../utils/secureUserResponse");

let updateUser = async (req, res) => {

    try {
        let updatePassed = req.body;
     

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