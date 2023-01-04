const asyncHandler = require('express-async-handler')

const Pass = require('../models/passModel')

const getPasses = asyncHandler(async (req, res) => {
    const passes = await Pass.find()

    res.status(200).json(passes)
})

const setPass = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Post pass'})
})

const updatePass = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update pass ${req.params.id}`})
})

const deletePass = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete pass ${req.params.id}`})
})

module.exports = {
    getPasses,
    setPass,
    updatePass,
    deletePass,
}