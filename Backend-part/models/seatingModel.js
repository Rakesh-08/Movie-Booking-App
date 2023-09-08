

let mongoose = require('mongoose');

let seatSchema = new mongoose.Schema({

    theatreId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:"theatres"
    },
    shift: {
        type: String,
        required:true
    },
    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        required:true
    }
,
    totalSeats: {
        type: Number,
        required: true,
        maxLength: 100,
        default:56
    },

    occupiedSeats: {
        type: Array,
        required: true,
        default:[]
    },
    createdAt: {
        type: Date,
        immutable: true,
        default:()=>Date.now()
    },
    updatedAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }

})

module.exports = mongoose.model('seatingPlan', seatSchema);
