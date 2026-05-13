const mongoose = require('mongoose')
const User = require('../models/User')
const Package = require('../models/Package')

const seedDB = async () => {
  try {
    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@nycturismo.com' })
    if (!adminExists) {
      const salt = await require('bcryptjs').genSalt(10)
      const hashedPassword = await require('bcryptjs').hash('admin123', salt)
      await User.create({
        name: 'Admin',
        email: 'admin@nycturismo.com',
        password: hashedPassword,
        role: 'admin',
      })
      console.log('Admin user created')
    }

    // Create sample packages
    const packages = [
      {
        title: 'Viaje a Cancún',
        slug: 'viaje-cancun',
        destination: 'Cancún, México',
        description: 'Disfruta de las playas paradisíacas de Cancún con todo incluido.',
        price: 1200,
        images: ['https://via.placeholder.com/500x300?text=Cancun+1', 'https://via.placeholder.com/500x300?text=Cancun+2'],
        duration: 7,
        includes: ['Vuelo ida y vuelta', 'Hotel 5 estrellas', 'Desayuno incluido', 'Traslados'],
        excludes: ['Comidas adicionales', 'Actividades opcionales'],
        featured: true,
      },
      {
        title: 'Tour por Europa',
        slug: 'tour-europa',
        destination: 'Europa',
        description: 'Recorre las ciudades más emblemáticas de Europa en un tour inolvidable.',
        price: 2500,
        images: ['https://via.placeholder.com/500x300?text=Europa+1', 'https://via.placeholder.com/500x300?text=Europa+2'],
        duration: 14,
        includes: ['Vuelos internacionales', 'Hoteles 4 estrellas', 'Guía turístico', 'Entradas a museos'],
        excludes: ['Comidas', 'Propinas'],
        featured: true,
      },
      {
        title: 'Aventura en Patagonia',
        slug: 'aventura-patagonia',
        destination: 'Patagonia, Argentina',
        description: 'Vive una experiencia única en la Patagonia con actividades de aventura.',
        price: 1800,
        images: ['https://via.placeholder.com/500x300?text=Patagonia+1', 'https://via.placeholder.com/500x300?text=Patagonia+2'],
        duration: 10,
        includes: ['Vuelo a Buenos Aires', 'Traslados', 'Actividades de trekking', 'Guía experto'],
        excludes: ['Equipamiento personal', 'Comidas'],
        featured: false,
      },
    ]

    for (const pkg of packages) {
      const exists = await Package.findOne({ slug: pkg.slug })
      if (!exists) {
        await Package.create(pkg)
        console.log(`Package ${pkg.title} created`)
      }
    }

    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

module.exports = seedDB