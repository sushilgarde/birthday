const mongoose = require('mongoose')

const Session = mongoose.model('Session', {
    sessionId:{
        type: String,
        required: true,
        trim: true
    },
    sessionName:{
        type: String,
        required: true,
        trim: true
    },
    user:{
        type: Array
    },
    maxLikes: {
        type: Number,
        default: 0
    },
    label1:{
        type: String,
        default: 'What went well'
    },
    label2:{
        type: String,
        default: 'To Improve'
    },
    label3:{
        type: String,
        default: 'Action Items'
    },
    hideLike:{
        type: Boolean,
        default: false
    },
    hideComment:{
        type: Boolean,
        default: false
    },
    hideToImprove:{
        type: Boolean,
        default: false
    },
    hideActionItem:{
        type: Boolean,
        default: false
    },
    label1_color:{
        type: String,
        default: '#16a48a'
    },
    label2_color:{
        type: String,
        default: '#d46448'
    },
    label3_color: {
        type: String,
        default: '#9a6fc7'
    }
})

module.exports = Session