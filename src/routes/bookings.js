const express = require('express')
const { getBookings, createBooking } = require('../controllers/bookingController')
const { protect, admin } = require('../middlewares/auth')

const router = express.Router()

router.get('/', protect, admin, getBookings)
router.post('/', protect, createBooking)

module.exports = router