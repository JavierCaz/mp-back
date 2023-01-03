const getPasses = (req, res) => {
    res.status(200).json({message: 'Get pass'})
}

const setPass = (req, res) => {
    res.status(200).json({message: 'Post pass'})
}

const updatePass = (req, res) => {
    res.status(200).json({message: `Update pass ${req.params.id}`})
}

const deletePass = (req, res) => {
    res.status(200).json({message: `Delete pass ${req.params.id}`})
}

module.exports = {
    getPasses,
    setPass,
    updatePass,
    deletePass,
}