const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    premium: {
        type: Boolean,
        default: false
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId
            }
        }
    ],
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 3000
    },

});

module.exports = mongoose.model('post', PostSchema);