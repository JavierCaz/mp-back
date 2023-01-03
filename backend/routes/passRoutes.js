const express = require('express')
const router = express.Router()
const { getPasses, setPass, updatePass, deletePass } = require('../controllers/passController')

router.route('/').get(getPasses).post(setPass)
router.route('/:id').delete(deletePass).put(updatePass)

module.exports = router