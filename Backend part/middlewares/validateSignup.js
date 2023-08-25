let userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
    
    // validate name
    if (!req.body.name) {
        return res.status(400).send({
            message:"please pass the name of the user"
        })
    }

    // validate email
    if (!req.body.email) {
        return res.status(400).send({
            message: "please pass  email of the user"
        })
    }


    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
        return res.status(400).send({
            message: "please put valid email "
        })
    }

    // validate email id already exist 
    const IsUserEmailExist = await userModel.findOne({ email: req.body.email })
    if (IsUserEmailExist) {

        return res.status(400).send({
            message: "Failed!  email id already exist"
        })
    }
   
    // validate the address
    if (!req.body.address) {
        return res.status(400).send({
            message:"please enter your complete address"
        })
    }

    // validate userId
  if (!req.body.userId) {
        return res.status(400).send({
            message: "please pass the userId"
        })
    }


    // validate user already exist or not
    let IsUserExist = await userModel.findOne({
        userId:req.body.userId.trim()
    })

    if (IsUserExist) {
        return res.status(400).send({
            message:"Sorry! user already have an account with this userId"
        })
    }

    // validate password
    if (!req.body.password) {
        return res.status(400).send({
            message: "please provide a password for your account"
        })
    }
   

    next();
    
}