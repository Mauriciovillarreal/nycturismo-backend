const Package = require('../models/Package')

/* =========================
   GET ALL PACKAGES
========================= */

const getPackages = async (req, res) => {

  try {

    const { featured, category } = req.query

    const query = {}

    // DESTACADOS
    if (featured === 'true') {
      query.featured = true
    }

    // CATEGORIA
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
   CREATE PACKAGE
========================= */

const createPackage = async (req, res) => {

  try {

    const {
      title,
      origin,
      destination,
      category,
      description,
      price,
      images,
      duration,
      includes,
      excludes,
      featured,
      availableDates
    } = req.body

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')

    const pkg = await Package.create({

      title,
      slug,

      origin,
      destination,
      category,

      description,

      price,

      images,

      duration,

      includes,

      excludes,

      featured,

      availableDates

    })

    res.status(201).json(pkg)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

/* =========================
   UPDATE PACKAGE
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

    pkg.origin = req.body.origin || pkg.origin

    pkg.destination =
      req.body.destination || pkg.destination

    pkg.category =
      req.body.category || pkg.category

    pkg.description =
      req.body.description || pkg.description

    pkg.price =
      req.body.price || pkg.price

    pkg.images =
      req.body.images || pkg.images

    pkg.duration =
      req.body.duration || pkg.duration

    pkg.includes =
      req.body.includes || pkg.includes

    pkg.excludes =
      req.body.excludes || pkg.excludes

    pkg.featured =
      req.body.featured !== undefined
        ? req.body.featured
        : pkg.featured

    pkg.availableDates =
      req.body.availableDates || pkg.availableDates

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

    const {
      origin,
      destination,
      category
    } = req.query

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