const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReportVideoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    social: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('report', ReportVideoSchema);