require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')
const authRoutes = require('./routes/auth')
const packageRoutes = require('./routes/packages')
const bookingRoutes = require('./routes/bookings')
const uploadRoutes = require('./routes/upload')
const sitemapRoutes = require('./routes/sitemap.routes')

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/packages', packageRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/', sitemapRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})