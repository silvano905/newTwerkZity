const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PaymentIntent = new Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    price: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('paymentIntent', PaymentIntent);