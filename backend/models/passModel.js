const mongoose = require('mongoose')

const passSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestapms: true,
})

module.exports = mongoose.model('Pass', passSchema)