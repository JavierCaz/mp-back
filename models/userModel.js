const mongoose = require('mongoose')
const { Schema } = mongoose

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
    },
    passes: [{
        type: Schema.Types.ObjectId,
        ref: 'Pass'
    }]
}, {
    timestapms: true
})

module.exports = mongoose.model('User', userSchema)