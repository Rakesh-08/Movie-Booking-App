let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique:true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength:8
    },
    address: {
        type: String,
        required:true
    },
    userType: {
        type: String,
        required: true,
        default:"CUSTOMER"
    },
    userStatus: {
        type: String,
        required: true,
        default:"PENDING"
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = mongoose.model("users", userSchema);