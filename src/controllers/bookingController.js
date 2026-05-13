const Booking = require('../models/Booking')

const getBookings = async (req, res) => {
  const bookings = await Booking.find().populate('user', 'name email').populate('package', 'title')
  res.json(bookings)
}

const createBooking = async (req, res) => {
  const { packageId, passengers } = req.body

  const pkg = await require('../models/Package').findById(packageId)
  const totalPrice = pkg.price * passengers

  const booking = await Booking.create({
    user: req.user.id,
    package: packageId,
    passengers,
    totalPrice,
  })

  res.status(201).json(booking)
}

module.exports = {
  getBookings,
  createBooking,
}