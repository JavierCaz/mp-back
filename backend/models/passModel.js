const mongoose = require('mongoose')

const passSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    }
}, {
    timestapms: true,
})

module.exports = mongoose.model('Goal', passSchema)