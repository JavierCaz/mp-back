const asyncHandler = require('express-async-handler')

const getPasses = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get pass'})
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