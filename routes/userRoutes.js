const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, setPin, updateUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.route('/:id')
    .put(protect, updateUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/set_pin', protect, setPin)

module.exports = router