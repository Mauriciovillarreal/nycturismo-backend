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

  // ===========================
  // MONEDAS Y COTIZACIÓN
  // ===========================
  // Define qué monedas admite este paquete
  acceptedCurrencies: {
    type: [{
      type: String,
      enum: ['ARS', 'USD']
    }],
    default: ['ARS'],
    validate: [arrayMinLength, 'Debe incluir al menos una moneda']
  },

  // Cotización del dólar de referencia al momento de la carga (opcional)
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

              // ===========================
              // PRECIOS MULTI-MONEDA
              // ===========================
              prices: [
                {
                  option: {
                    type: String,
                    required: true // Ej: "Doble", "Triple", "Pensión Completa"
                  },

                  // Estructura que soporta ambas monedas simultáneamente
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

// Validación auxiliar para array no vacío
function arrayMinLength(val) {
  return val.length > 0
}

module.exports = mongoose.model('Package', packageSchema)