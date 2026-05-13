const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  origin: {
    type: String,
    required: true,
  },

  destination: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  images: [
    {
      type: String,
    },
  ],

  duration: {
    type: Number,
    required: true,
  },

  includes: [
    {
      type: String,
    },
  ],

  excludes: [
    {
      type: String,
    },
  ],

  featured: {
    type: Boolean,
    default: false,
  },

  availableDates: [
    {
      type: Date,
    },
  ],

}, {
  timestamps: true,
})

module.exports = mongoose.model('Package', packageSchema)