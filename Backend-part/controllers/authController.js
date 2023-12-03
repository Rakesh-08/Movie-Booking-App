const userModel = require("../models/userModel");
let bcrypt = require("bcryptjs");
const secureUserResponse = require("../utils/secureUserResponse");
let jwt = require("jsonwebtoken");
const { secretKey } = require("../configs/authConfig");
let sendEmailFn = require("../utils/sendEmail");

let signup = async (req, res) => {
    
    try {
        let { userType } = req.body;

                let totalUsers = await  userModel.find({});

        if (totalUsers.length > 15) {
            return res.status(300).send({
                message:"Sorry! this application has limited capacity and its reached its maximum"
            })
        }

        
        let obj = {
            name: req.body.name,
            email: req.body.email,
            address:req.body.address,
            userId: req.body.userId.trim(),
            password: bcrypt.hashSync(req.body.password.trim(), 8)
        }
        
        if (userType) {
            obj.userType = userType
        }
        if (!userType || userType == "CUSTOMER") {
            obj.userStatus="APPROVED"
        }

        let user = await userModel.create(obj);
        
 // send email to the admin that somebody has signed up ;
      sendEmailFn()
        res.status(200).send(secureUserResponse([user]))


    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let signin = async (req, res) => {
    
    try {

        let { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(400).send({
                message: "please pass the login credential"
            })
        }

        let user = await userModel.findOne({
            userId: userId.trim()
        })

        if (!user) {
            return res.status(400).send({
                message: "Invalid userId ! NO user exist with given userId"
            })
        }

        if (user.userStatus !== "APPROVED") {
            return res.status(401).send({
                message:`can't allow to login as the user Status is in ${user.userStatus} state`
            })
        }

        let IsPasswordValid = bcrypt.compareSync(password.trim(), user.password)
        
        if (!IsPasswordValid) {
            return res.status(401).send({
                message: "Invalid Password!"
            })
        }
           
        let token = jwt.sign({ id: user.userId }, secretKey, { expiresIn: 85400 });

        user.accessToken = token;
        res.status(200).send(secureUserResponse([user]))


    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let createAdmin = async () => {
    

    let IsAdminExist = await userModel.findOne({
        userId: "Mandal",
        userType: "ADMIN",
        userStatus: "APPROVED"
        
    })

    if (IsAdminExist) {
        console.log("Admin already exist with userId : " + IsAdminExist.userId)
        return;
    }


    let object = {
        name: 'Rakesh Mandal',
        email: "Mandal@gmail.com",
        userId: "Mandal ",
        password: bcrypt.hashSync("mandalSir", 8),
        address: "A/432,sonia vihar,zero pusta, delhi 110090",
        userType: "ADMIN",
        userStatus :"APPROVED"
    }

    await userModel.create(object)
    console.log("Admin created for this movie booking app")
}

module.exports = {
    signup,
    signin,
    createAdmin
}
