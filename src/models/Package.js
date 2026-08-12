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

  // ===========================
  // CATEGORÍAS
  // ===========================
  category: {
    type: String,
    required: [true, 'La categoría principal es obligatoria'],
    trim: true
  },

  secondaryCategories: [{
    type: String,
    trim: true
  }],

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

  // ===========================
  // MODALIDAD DE PAGO Y MONEDAS
  // ===========================
  paymentMode: {
    type: String,
    enum: [
      'SINGLE', // Solo se cobra en 1 moneda (ARS o USD)
      'CHOICE', // El cliente elige pagar el 100% en ARS o el 100% en USD
      'SPLIT'   // El paquete se cobra una parte en ARS Y otra parte en USD obligatoriamente
    ],
    default: 'CHOICE'
  },

  acceptedCurrencies: {
    type: [{
      type: String,
      enum: ['ARS', 'USD']
    }],
    default: ['ARS', 'USD'],
    validate: [arrayMinLength, 'Debe incluir al menos una moneda']
  },

  exchangeRate: {
    type: Number,
    min: 0,
    default: null
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

      options: [
        {
          name: {
            type: String,
            required: true
          }
        }
      ],

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

                  // Estructura refinada para soportar montos en ambas monedas
                  amounts: {
                    ars: {
                      type: Number,
                      min: 0,
                      default: null
                    },
                    usd: {
                      type: Number,
                      min: 0,
                      default: null
                    }
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

packageSchema.index({ category: 1, secondaryCategories: 1 })

function arrayMinLength(val) {
  return val.length > 0
}

module.exports = mongoose.model('Package', packageSchema)