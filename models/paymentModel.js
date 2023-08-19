
let mongoose = require("mongoose");

let paymentSchema = new mongoose.Schema({
    
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        required:true
    },
    amount: {
        type: Number,
        required:true
    },
    paymentStatus: {
        type: String,
        default:"PENDING"
    },
    createdAt: {
        type: Date,
        immutable: true,
        default:()=>Date.now()
    },
    updatedAt: {
        type: Date,
        default:()=>Date.now()
    }
})

module.exports = mongoose.model("payments", paymentSchema);