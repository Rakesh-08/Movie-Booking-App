let mongoose = require("mongoose");

let bookingSchema = new mongoose.Schema({
    
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
        required:true
    },
    theatreId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "theatres",
        required:true
    },
    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "movies",
        required:true
    },
    NoOfTickets: {
        type: Number,
        required:true
    },
    Timing: {
        type: String,
        required:true
    },
    pricePerTicket: {
        type: Number  
    },
    status: {
        type: String,
        default:"IN_PROGRESS"
        
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

module.exports=mongoose.model("bookings",bookingSchema)