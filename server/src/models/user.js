const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: {
        type: String,
        trim: true,
        required: true
    },
    sessionId:{
        type: String,
        trim: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    socketId: {
        type: String
    },
    connected:{
        type: Boolean,
        default: true
    }
})

module.exports = User