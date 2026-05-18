const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true // Elimina espacios innecesarios al inicio y final
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true // Asegura que los slugs queden siempre en minúsculas
  },

  // NUEVO: Código del operador turistico de referencia interna
  operatorCode: {
    type: String,
    trim: true,
    default: ''
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

  days: {
    type: Number,
    required: true,
    min: 1 // Evita números negativos o cero de forma nativa
  },

  nights: {
    type: Number,
    required: true,
    min: 0 // Permite 0 para escapadas de un solo día
  },

  currency: {
    type: String,
    enum: ['ARS', 'USD'],
    default: 'ARS',
  },

  // CORRECCIÓN ANTERIOR: Cambiamos 'type' por 'mode' para evitar conflictos con Mongoose
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
    required: true,
    validate: {
      validator: function(value) {
        const busCategories = ['semi-cama', 'cama', 'semi-cama/cama'];
        const planeCategories = [
          'clase-economica',
          'economica-premium',
          'clase-ejecutiva',
          'primera-clase'
        ];
        
        // Accedemos correctamente al objeto transport
        const currentMode = this.transport?.mode;
        
        if (currentMode === 'bus') {
          return busCategories.includes(value);
        }
        if (currentMode === 'plane') {
          return planeCategories.includes(value);
        }
        return false;
      },
      message: 'La categoría de transporte no coincide con el medio de transporte seleccionado.'
    }
  }
},

  circuits: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      includes: [String], // Sintaxis más limpia para arrays de strings
      excludes: [String],
      price: {
        type: Number,
        min: 0
      },
      currency: {
        type: String,
        enum: ['ARS', 'USD'],
        default: 'ARS',
      },
    },
  ],

  images: [String], // Sintaxis limpia para arrays de strings

  featured: {
    type: Boolean,
    default: false,
  },

  // FECHAS DISPONIBLES + HOTEL + MINIATURA (ACTUALIZADO)
  availableDates: [
    {
      date: {
        type: Date,
        required: true,
      },
      hotel: {
        type: String,
        required: true,
      },
      // NUEVO: Guarda la URL de la foto miniatura del hotel asignado
      hotelImage: {
        type: String,
        trim: true,
        default: ''
      },
    },
  ],

}, {
  timestamps: true,
})

module.exports = mongoose.model('Package', packageSchema)