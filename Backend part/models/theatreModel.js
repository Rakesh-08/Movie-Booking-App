const mongoose = require("mongoose");


let theatreSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    city: {
        type: String,
        required:true
    },
    pincode: {
        type: Number,
        required: true
    },
    movies: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref:"movies"
    },
    basePrice: {
        type: Number,
        required:true
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:"users"
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

module.exports = mongoose.model("theatres", theatreSchema);