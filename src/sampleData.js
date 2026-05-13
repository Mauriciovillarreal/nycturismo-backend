const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Package = require('./models/Package');
const Booking = require('./models/Booking');

dotenv.config();

const bcrypt = require('bcrypt');

const adminUser = {
  name: 'Administrador NycTurismo',
  email: 'admin@nycturismo.com',
  password: 'Admin1234',
  role: 'admin',
};

const samplePackages = [
  {
    title: 'Aventura en Bariloche',
    destination: 'Bariloche, Argentina',
    description: 'Descubre lagos cristalinos, senderos y gastronomía de montaña en un paquete de lujo.',
    price: 1299,
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1690000000/bariloche1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1690000000/bariloche2.jpg',
    ],
    duration: '5 días / 4 noches',
    includes: ['Alojamiento 4 estrellas', 'Traslados aeropuerto', 'Excursión guiada'],
    excludes: ['Vuelos', 'Seguro de viaje'],
    featured: true,
    availableDates: ['2026-08-10', '2026-09-15'],
  },
  {
    title: 'Playas del Caribe',
    destination: 'Punta Cana, República Dominicana',
    description: 'Relájate en playas de arena blanca con resorts premium y actividades todo incluido.',
    price: 1899,
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1690000000/caribe1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1690000000/caribe2.jpg',
    ],
    duration: '7 días / 6 noches',
    includes: ['Resort all inclusive', 'Traslados', 'Excursiones náuticas'],
    excludes: ['Tasas de aeropuerto', 'Excursiones opcionales'],
    featured: true,
    availableDates: ['2026-10-05', '2026-11-20'],
  },
  {
    title: 'Ruta gourmet en Buenos Aires',
    destination: 'Buenos Aires, Argentina',
    description: 'Vive la cultura, cenas premium y hoteles boutique en un tour urbano exclusivo.',
    price: 999,
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1690000000/buenosaires1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1690000000/buenosaires2.jpg',
    ],
    duration: '4 días / 3 noches',
    includes: ['Hotel boutique', 'City tour', 'Cena gourmet'],
    excludes: ['Aéreos internacionales'],
    featured: false,
    availableDates: ['2026-09-01', '2026-09-25'],
  },
];

const seedDatabase = async () => {
  await connectDB();
  await Booking.deleteMany();
  await Package.deleteMany();
  await User.deleteMany();

  console.log('Creando usuario admin...');
  adminUser.password = await bcrypt.hash(adminUser.password, 10);
  const admin = await User.create(adminUser);

  console.log('Creando paquetes de ejemplo...');
  for (const data of samplePackages) {
    await Package.create(data);
  }

  console.log('Datos de ejemplo insertados correctamente.');
  process.exit();
};

seedDatabase().catch((error) => {
  console.error(error);
  process.exit(1);
});
