const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pleade add a name']
    },
    email: {
        type: String,
        required: [true, 'Pleade add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Pleade add a password']
    }
}, {
    timestapms: true
})

module.exports = mongoose.model('User', userSchema)