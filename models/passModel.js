const mongoose = require('mongoose')

const passSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    uri: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notes: String
}, {
    timestapms: true,
})

module.exports = mongoose.model('Pass', passSchema)