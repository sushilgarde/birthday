const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', {
    text: {
        type: String,
        trim: true,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    like:{
        type: Number,
        default: 0
    },
    sessionId: {
        type: String,
        required: true,
        trim: true
    },
    context:{
        type: String,
        required: true,
        trim: true
    }
})

module.exports = Comment;