const { Schema, model, Mongoose } = require('mongoose');

const BookingSchema = Schema({
    date: String,
    approved: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {
        type: Schema.Types.ObjectId,
        ref: 'Spot'
    },
});

module.exports = model('Booking', BookingSchema);