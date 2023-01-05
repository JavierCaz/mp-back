const express = require('express')
const router = express.Router()
const { getPasses, setPass, updatePass, deletePass } = require('../controllers/passController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPasses).post(protect, setPass)
router.route('/:id').delete(protect, deletePass).put(protect, updatePass)

module.exports = router