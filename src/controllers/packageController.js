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
      query.$or = [
        { category: category },
        { secondaryCategories: category }
      ]
    }

    const packages = await Package.find(query)
    console.log(`📦 Se consultaron todos los paquetes (${packages.length} encontrados)`)
    res.json(packages)
  } catch (error) {
    console.error(`❌ Error al obtener paquetes: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

/* =========================
   GET PACKAGE BY SLUG
========================= */
const getPackageBySlug = async (req, res) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug })

    if (!pkg) {
      console.log(`⚠️ Paquete no encontrado por slug: "${req.params.slug}"`)
      return res.status(404).json({ message: 'Package not found' })
    }

    console.log(`📦 Se consultó el paquete: "${pkg.title}"`)
    res.json(pkg)
  } catch (error) {
    console.error(`❌ Error al obtener paquete por slug (${req.params.slug}): ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

/* =========================
   GET PACKAGE BY ID
========================= */
const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id)

    if (!pkg) {
      console.log(`⚠️ Paquete no encontrado por ID: ${req.params.id}`)
      return res.status(404).json({ message: 'Paquete no encontrado' })
    }

    console.log(`📦 Se consultó el paquete: "${pkg.title}"`)
    res.json(pkg)
  } catch (error) {
    console.error(`❌ Error al obtener paquete por ID (${req.params.id}): ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

/* =========================
   CREATE PACKAGE
========================= */
const createPackage = async (req, res) => {
  try {
    const {
      title,
      operatorCode,
      origin,
      destination,
      category,
      secondaryCategories,
      description,
      days,
      nights,
      paymentMode,        // 👈 Nuevo campo recibido
      acceptedCurrencies,
      exchangeRate,       // 👈 Nuevo campo opcional
      transport,
      images,
      circuits,
      featured
    } = req.body

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')

    const pkg = await Package.create({
      title,
      slug,
      operatorCode,
      origin,
      destination,
      category,
      secondaryCategories: secondaryCategories || [],
      description,
      days,
      nights,
      paymentMode: paymentMode || 'CHOICE', // 👈 Valor por defecto en caso de no enviar
      acceptedCurrencies: acceptedCurrencies || ['ARS', 'USD'],
      exchangeRate: exchangeRate || null,
      transport,
      images,
      circuits,
      featured
    })

    console.log(`✅ Se agregó el paquete "${pkg.title}"`)
    res.status(201).json(pkg)
  } catch (error) {
    console.error(`❌ Error al crear paquete "${req.body.title || 'sin título'}": ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

/* =========================
   UPDATE PACKAGE
========================= */
const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id)

    if (!pkg) {
      console.log(`⚠️ No se pudo editar. Paquete no encontrado ID: ${req.params.id}`)
      return res.status(404).json({ message: 'Package not found' })
    }

    pkg.title = req.body.title || pkg.title

    pkg.slug = req.body.title
      ? req.body.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
      : pkg.slug

    pkg.operatorCode = req.body.operatorCode !== undefined 
      ? req.body.operatorCode 
      : pkg.operatorCode

    pkg.origin = req.body.origin || pkg.origin
    pkg.destination = req.body.destination || pkg.destination
    pkg.category = req.body.category || pkg.category

    if (req.body.secondaryCategories !== undefined) {
      pkg.secondaryCategories = req.body.secondaryCategories
    }

    pkg.description = req.body.description || pkg.description
    pkg.days = req.body.days || pkg.days
    pkg.nights = req.body.nights || pkg.nights

    // 👈 Actualización de modalidades de pago y monedas
    pkg.paymentMode = req.body.paymentMode || pkg.paymentMode

    if (req.body.acceptedCurrencies !== undefined) {
      pkg.acceptedCurrencies = req.body.acceptedCurrencies
    }

    if (req.body.exchangeRate !== undefined) {
      pkg.exchangeRate = req.body.exchangeRate
    }

    pkg.transport = req.body.transport || pkg.transport
    pkg.images = req.body.images || pkg.images
    pkg.circuits = req.body.circuits || pkg.circuits
    
    pkg.featured = req.body.featured !== undefined
      ? req.body.featured
      : pkg.featured

    const updatedPkg = await pkg.save()
    console.log(`✏️ Se editó el paquete "${updatedPkg.title}"`)
    res.json(updatedPkg)
  } catch (error) {
    console.error(`❌ Error al editar paquete ID ${req.params.id}: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

/* =========================
   DELETE PACKAGE
========================= */
const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id)

    if (!pkg) {
      console.log(`⚠️ No se pudo eliminar. Paquete no encontrado ID: ${req.params.id}`)
      return res.status(404).json({ message: 'Package not found' })
    }

    const deletedTitle = pkg.title
    await pkg.deleteOne()

    console.log(`🗑️ Se eliminó el paquete "${deletedTitle}"`)
    res.json({ message: 'Package removed' })
  } catch (error) {
    console.error(`❌ Error al eliminar paquete ID ${req.params.id}: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

/* =========================
   SEARCH PACKAGES
========================= */
const searchPackages = async (req, res) => {
  try {
    const { origin, destination, category } = req.query
    const filters = {}

    if (origin) filters.origin = origin
    if (destination) filters.destination = destination

    if (category) {
      filters.$or = [
        { category: category },
        { secondaryCategories: category }
      ]
    }

    const packages = await Package.find(filters)
    console.log(`🔍 Se buscaron paquetes (${packages.length} resultados)`)
    res.json(packages)
  } catch (error) {
    console.error(`❌ Error al buscar paquetes: ${error.message}`)
    res.status(500).json({ message: error.message })
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