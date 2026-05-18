const Package = require('../models/Package')

/* =========================
   GET ALL PACKAGES
========================= */
const getPackages = async (req, res) => {
  try {
    const { featured, category } = req.query
    const query = {}

    if (featured === 'true') {
      query.featured = true
    }

    if (category) {
      query.category = category
    }

    const packages = await Package.find(query)
    res.json(packages)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/* =========================
   GET PACKAGE BY SLUG
========================= */
const getPackageBySlug = async (req, res) => {
  try {
    const pkg = await Package.findOne({
      slug: req.params.slug
    })

    if (!pkg) {
      return res.status(404).json({
        message: 'Package not found'
      })
    }

    res.json(pkg)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/* =========================
   GET PACKAGE BY ID
========================= */
const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id)

    if (!pkg) {
      return res.status(404).json({
        message: 'Paquete no encontrado'
      })
    }

    res.json(pkg)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/* =========================
   CREATE PACKAGE (ACTUALIZADO)
========================= */
const createPackage = async (req, res) => {
  try {
    const {
      title,
      operatorCode, // AGREGADO
      origin,
      destination,
      category,
      description,
      days,
      nights,
      currency,
      transport,
      images,
      circuits,
      featured,
      availableDates
    } = req.body

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')

    // FORMATEAR FECHAS: Se añade hotelImage al mapeo
    const formattedDates = availableDates?.map(item => ({
      date: item.date,
      hotel: item.hotel,
      hotelImage: item.hotelImage || '' // AGREGADO
    })) || []

    const pkg = await Package.create({
      title,
      slug,
      operatorCode, // AGREGADO
      origin,
      destination,
      category,
      description,
      days,
      nights,
      currency,
      transport,
      images,
      circuits,
      featured,
      availableDates: formattedDates
    })

    res.status(201).json(pkg)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message
    })
  }
}

/* =========================
   UPDATE PACKAGE (ACTUALIZADO)
========================= */
const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id)

    if (!pkg) {
      return res.status(404).json({
        message: 'Package not found'
      })
    }

    pkg.title = req.body.title || pkg.title

    pkg.slug = req.body.title
      ? req.body.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
      : pkg.slug

    // ACTUALIZACIÓN DE OPERATOR CODE
    pkg.operatorCode = req.body.operatorCode !== undefined 
      ? req.body.operatorCode 
      : pkg.operatorCode

    pkg.origin = req.body.origin || pkg.origin
    pkg.destination = req.body.destination || pkg.destination
    pkg.category = req.body.category || pkg.category
    pkg.description = req.body.description || pkg.description
    pkg.days = req.body.days || pkg.days
    pkg.nights = req.body.nights || pkg.nights
    pkg.currency = req.body.currency || pkg.currency
    pkg.transport = req.body.transport || pkg.transport
    pkg.images = req.body.images || pkg.images
    pkg.circuits = req.body.circuits || pkg.circuits
    
    pkg.featured = req.body.featured !== undefined
      ? req.body.featured
      : pkg.featured

    // ACTUALIZACIÓN DE AVAILABLE DATES: Agregado hotelImage
    if (req.body.availableDates) {
      pkg.availableDates = req.body.availableDates.map(item => ({
        date: item.date,
        hotel: item.hotel,
        hotelImage: item.hotelImage || '' // AGREGADO
      }))
    }

    const updatedPkg = await pkg.save()
    res.json(updatedPkg)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message
    })
  }
}

/* =========================
   DELETE PACKAGE
========================= */
const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id)

    if (!pkg) {
      return res.status(404).json({
        message: 'Package not found'
      })
    }

    await pkg.deleteOne()
    res.json({
      message: 'Package removed'
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/* =========================
   SEARCH PACKAGES
========================= */
const searchPackages = async (req, res) => {
  try {
    const { origin, destination, category } = req.query
    const filters = {}

    if (origin) {
      filters.origin = origin
    }

    if (destination) {
      filters.destination = destination
    }

    if (category) {
      filters.category = category
    }

    const packages = await Package.find(filters)
    res.json(packages)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getPackages,
  getPackageBySlug,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
  searchPackages
}