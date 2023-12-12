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
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    favorite: {
        type: Boolean,
        required: true
    }
}, {
    timestapms: true,
})

module.exports = mongoose.model('Pass', passSchema)