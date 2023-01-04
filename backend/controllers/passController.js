const asyncHandler = require('express-async-handler')

const Pass = require('../models/passModel')

const getPasses = asyncHandler(async (req, res) => {
    const passes = await Pass.find()

    res.status(200).json(passes)
})

const setPass = asyncHandler(async (req, res) => {

    const pass = await Pass.create({
        text: req.body.text
    })

    res.status(200).json(pass)
})

const updatePass = asyncHandler(async (req, res) => {
    const pass = await Pass.findById(req.params.id)

    if(!pass){
        res.status(400)
        throw new Error ('Pass not found')
    }

    const updatedPass = await Pass.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedPass)
})

const deletePass = asyncHandler(async (req, res) => {
    const pass = await Pass.findById(req.params.id)

    if(!pass){
        res.status(400)
        throw new Error ('Pass not found')
    }

    await pass.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getPasses,
    setPass,
    updatePass,
    deletePass,
}