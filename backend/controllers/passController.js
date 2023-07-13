const asyncHandler = require('express-async-handler')
const crypto = require('crypto');
const assert = require('assert');
const Pass = require('../models/passModel')
const User = require('../models/userModel')

const getPasses = asyncHandler(async (req, res) => {
    const passes = await Pass.find({
        user: req.user.id
    })

    res.status(200).json(passes)
})

const setPass = asyncHandler(async (req, res) => {
    // if(!req.body.text){
    //     res.status(400)
    //     throw new Error('Pleas add a text field')
    // }

    const {name, password, uri, notes} = req.body

    const pass = await Pass.create({
        user: req.user.id,
        name, 
        password: encryptPassword(password), 
        uri, 
        notes
    })

    res.status(200).json(pass)
})

const updatePass = asyncHandler(async (req, res) => {
    const pass = await Pass.findById(req.params.id)

    if(!pass){
        res.status(400)
        throw new Error ('Pass not found')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    if(pass.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if(pass.password && pass.password !== req.body.password){
        req.body.password = encryptPassword(req.body.password)
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

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    if(pass.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await pass.remove()

    res.status(200).json({id: req.params.id})
})

const encryptPassword = (password) => {
    const key = crypto.scryptSync(process.env.aes256cbc_Key, 'salt', 32);
    const iv = crypto.randomBytes(16);

    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);  
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + encrypted;
}

const decryptPassword = (password) => {
    const key = crypto.scryptSync(process.env.aes256cbc_Key, 'salt', 32);
    const storedIV = password.substr(0, 32);
    const encryptedPassword = password.substr(32);
    
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(storedIV, 'hex'));  
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

module.exports = {
    getPasses,
    setPass,
    updatePass,
    deletePass,
}