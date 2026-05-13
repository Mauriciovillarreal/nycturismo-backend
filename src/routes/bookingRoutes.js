const express = require('express');
const { getBookings, createBooking } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', protect, adminOnly, getBookings);
router.post('/', protect, createBooking);

module.exports = router;
