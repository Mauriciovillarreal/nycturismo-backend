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

  // DURACIÓN
  days: {
    type: Number,
    required: true,
  },

  nights: {
    type: Number,
    required: true,
  },

  // MONEDA
  currency: {
    type: String,
    enum: ['ARS', 'USD'],
    default: 'ARS',
  },


  // TRANSPORTE
  transport: {
    type: {
      type: String,
      enum: ['bus', 'plane'],
      required: true,
    },

    category: {
      type: String,
      enum: [
        'semi-cama',
        'cama',
        'semi-cama/cama',
        'economy',
        'premium economy',
        'business'
      ],
      required: true
    }

  },

  // CIRCUITOS / PLANES
  circuits: [
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
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

      price: {
        type: Number,
      },

      currency: {
        type: String,
        enum: ['ARS', 'USD'],
        default: 'ARS',
      },
    },
  ],

  images: [
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