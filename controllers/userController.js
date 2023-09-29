const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            // _id: user.id,
            // name: user.name,
            // email: user.email,
            token: generateToken(user._id),
            mustSetPin: true
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            mustSetPin: !Boolean(user.pin)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

const setPin = async (req, res) => {
    const { pin } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPin = await bcrypt.hash(pin, salt)

    await User.updateOne({ _id: req.user._id }, { pin: hashedPin })

    res.status(200).json({ success: true })
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const updateUser = asyncHandler(async (req, res) => {
    const usersEmail = await User.find({ email: req.body.email })
    const user = await User.findById(req.user._id)

    if (usersEmail.lenght > 1) {
        res.status(401)
        throw new Error('Email already in use')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (user.id !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    try {
        let response = await User.findByIdAndUpdate(user.id, req.body, { new: true })
        res.status(200).json(response)
    } catch (e) {
        res.status(401)
        throw new Error(e)
    }
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    setPin,
    updateUser
}