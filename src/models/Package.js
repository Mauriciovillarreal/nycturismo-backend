const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  operatorCode: {
    type: String,
    trim: true,
    default: ''
  },

  origin: {
    type: String,
    required: true
  },

  destination: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  days: {
    type: Number,
    required: true,
    min: 1
  },

  nights: {
    type: Number,
    required: true,
    min: 0
  },

  currency: {
    type: String,
    enum: ['ARS', 'USD'],
    default: 'ARS'
  },

  transport: {
    mode: {
      type: String,
      enum: ['bus', 'plane'],
      required: true
    },
    category: {
      type: String,
      enum: [
        'semi-cama',
        'cama',
        'semi-cama/cama',
        'clase-economica',
        'economica-premium',
        'clase-ejecutiva',
        'primera-clase'
      ],
      required: true
    }
  },

  // ===========================
  // CIRCUITOS
  // ===========================

  circuits: [
    {
      title: {
        type: String,
        required: true
      },

      description: {
        type: String,
        default: ''
      },

      includes: [String],

      excludes: [String],

      // Opciones de alojamiento / régimen
      options: [
        {
          name: {
            type: String,
            required: true
          }
        }
      ],

      // Hoteles del circuito
      hotels: [
        {
          name: {
            type: String,
            required: true
          },

          image: {
            type: String,
            default: ''
          },

          stars: {
            type: Number,
            default: null
          },

          city: {
            type: String,
            default: ''
          },

          // Fechas disponibles para ese hotel
          departures: [
            {
              date: {
                type: Date,
                required: true
              },

              prices: [
                {
                  option: {
                    type: String,
                    required: true
                  },

                  amount: {
                    type: Number,
                    required: true,
                    min: 0
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],

  images: [String],

  featured: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
})

module.exports = mongoose.model('Package', packageSchema)