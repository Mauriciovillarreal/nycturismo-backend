const Package = require('../models/Package')

/* =========================
   GET ALL PACKAGES
========================= */
const getPackages = async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log('==========================')
  console.log('GET ALL PACKAGES - INICIO')
  console.log(`Fecha: ${timestamp}`)
  console.log(`Método: ${req.method}`)
  console.log(`Ruta: ${req.originalUrl || req.url}`)
  console.log(`IP: ${req.ip || req.connection.remoteAddress}`)
  console.log(`User Agent: ${req.get('User-Agent')}`)
  console.log('Usuario (req.user):', JSON.stringify(req.user, null, 2))
  console.log('Session (req.session):', JSON.stringify(req.session, null, 2))
  console.log('Params:', JSON.stringify(req.params, null, 2))
  console.log('Query:', JSON.stringify(req.query, null, 2))
  console.log('Body:', JSON.stringify(req.body, null, 2))
  console.log('==========================')

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

    console.log('--- GET ALL PACKAGES SUCCESS ---')
    console.log(`Acción realizada: Obtener todos los paquetes`)
    console.log(`Cantidad encontrada: ${packages.length}`)
    console.log(`Usuario que realizó la acción: ${req.user ? req.user.id || req.user._id || req.user.email : 'Anónimo'}`)
    console.log('----------------------------------')

    res.json(packages)
  } catch (error) {
    console.error('==========================')
    console.error('ERROR EN GET ALL PACKAGES')
    console.error(`Name: ${error.name}`)
    console.error(`Message: ${error.message}`)
    console.error(`Code: ${error.code || 'N/A'}`)
    console.error(`Stack: ${error.stack}`)
    console.error('==========================')

    res.status(500).json({
      message: error.message
    })
  }
}

/* =========================
   GET PACKAGE BY SLUG
========================= */
const getPackageBySlug = async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log('==========================')
  console.log('GET PACKAGE BY SLUG - INICIO')
  console.log(`Fecha: ${timestamp}`)
  console.log(`Método: ${req.method}`)
  console.log(`Ruta: ${req.originalUrl || req.url}`)
  console.log(`IP: ${req.ip || req.connection.remoteAddress}`)
  console.log(`User Agent: ${req.get('User-Agent')}`)
  console.log('Usuario (req.user):', JSON.stringify(req.user, null, 2))
  console.log('Session (req.session):', JSON.stringify(req.session, null, 2))
  console.log('Params:', JSON.stringify(req.params, null, 2))
  console.log('Query:', JSON.stringify(req.query, null, 2))
  console.log('Body:', JSON.stringify(req.body, null, 2))
  console.log('==========================')

  try {
    const pkg = await Package.findOne({
      slug: req.params.slug
    })

    if (!pkg) {
      console.log('--- GET PACKAGE BY SLUG NOT FOUND ---')
      console.log(`Slug buscado: ${req.params.slug}`)
      console.log('--------------------------------------')
      return res.status(404).json({
        message: 'Package not found'
      })
    }

    console.log('--- GET PACKAGE BY SLUG SUCCESS ---')
    console.log(`Acción realizada: Obtener paquete por slug`)
    console.log(`ID: ${pkg._id}`)
    console.log(`Título: ${pkg.title}`)
    console.log(`Usuario que realizó la acción: ${req.user ? req.user.id || req.user._id || req.user.email : 'Anónimo'}`)
    console.log('------------------------------------')

    res.json(pkg)
  } catch (error) {
    console.error('==========================')
    console.error('ERROR EN GET PACKAGE BY SLUG')
    console.error(`Name: ${error.name}`)
    console.error(`Message: ${error.message}`)
    console.error(`Code: ${error.code || 'N/A'}`)
    console.error(`Stack: ${error.stack}`)
    console.error('==========================')

    res.status(500).json({
      message: error.message
    })
  }
}

/* =========================
   GET PACKAGE BY ID
========================= */
const getPackageById = async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log('==========================')
  console.log('GET PACKAGE BY ID - INICIO')
  console.log(`Fecha: ${timestamp}`)
  console.log(`Método: ${req.method}`)
  console.log(`Ruta: ${req.originalUrl || req.url}`)
  console.log(`IP: ${req.ip || req.connection.remoteAddress}`)
  console.log(`User Agent: ${req.get('User-Agent')}`)
  console.log('Usuario (req.user):', JSON.stringify(req.user, null, 2))
  console.log('Session (req.session):', JSON.stringify(req.session, null, 2))
  console.log('Params:', JSON.stringify(req.params, null, 2))
  console.log('Query:', JSON.stringify(req.query, null, 2))
  console.log('Body:', JSON.stringify(req.body, null, 2))
  console.log('==========================')

  try {
    const pkg = await Package.findById(req.params.id)

    if (!pkg) {
      console.log('--- GET PACKAGE BY ID NOT FOUND ---')
      console.log(`ID buscado: ${req.params.id}`)
      console.log('-----------------------------------')
      return res.status(404).json({
        message: 'Paquete no encontrado'
      })
    }

    console.log('--- GET PACKAGE BY ID SUCCESS ---')
    console.log(`Acción realizada: Obtener paquete por ID`)
    console.log(`ID: ${pkg._id}`)
    console.log(`Título: ${pkg.title}`)
    console.log(`Usuario que realizó la acción: ${req.user ? req.user.id || req.user._id || req.user.email : 'Anónimo'}`)
    console.log('---------------------------------')

    res.json(pkg)
  } catch (error) {
    console.error('==========================')
    console.error('ERROR EN GET PACKAGE BY ID')
    console.error(`Name: ${error.name}`)
    console.error(`Message: ${error.message}`)
    console.error(`Code: ${error.code || 'N/A'}`)
    console.error(`Stack: ${error.stack}`)
    console.error('==========================')

    res.status(500).json({
      message: error.message
    })
  }
}

/* =========================
   CREATE PACKAGE (ACTUALIZADO)
========================= */
const createPackage = async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log('==========================')
  console.log('CREATE PACKAGE - INICIO')
  console.log(`Fecha: ${timestamp}`)
  console.log(`Método: ${req.method}`)
  console.log(`Ruta: ${req.originalUrl || req.url}`)
  console.log(`IP: ${req.ip || req.connection.remoteAddress}`)
  console.log(`User Agent: ${req.get('User-Agent')}`)
  console.log('Usuario (req.user):', JSON.stringify(req.user, null, 2))
  console.log('Session (req.session):', JSON.stringify(req.session, null, 2))
  console.log('Params:', JSON.stringify(req.params, null, 2))
  console.log('Query:', JSON.stringify(req.query, null, 2))
  console.log('Body:', JSON.stringify(req.body, null, 2))
  console.log('==========================')

  try {
    const {
      title,
      operatorCode,
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

    const formattedDates = availableDates?.map(item => ({
      date: item.date,
      hotel: item.hotel,
      hotelImage: item.hotelImage || ''
    })) || []

    const pkg = await Package.create({
      title,
      slug,
      operatorCode,
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

    console.log('--- CREATE PACKAGE SUCCESS ---')
    console.log(`Acción realizada: Paquete creado correctamente`)
    console.log(`ID: ${pkg._id}`)
    console.log(`Título: ${pkg.title}`)
    console.log(`Usuario: ${req.user ? req.user.id || req.user._id || req.user.email : 'N/A (sin auth context)'}`)
    console.log('------------------------------')

    res.status(201).json(pkg)
  } catch (error) {
    console.error('==========================')
    console.error('ERROR EN CREATE PACKAGE')
    console.error(`Name: ${error.name}`)
    console.error(`Message: ${error.message}`)
    console.error(`Code: ${error.code || 'N/A'}`)
    console.error(`Stack: ${error.stack}`)
    console.error('==========================')

    res.status(500).json({
      message: error.message
    })
  }
}

/* =========================
   UPDATE PACKAGE (ACTUALIZADO)
========================= */
const updatePackage = async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log('==========================')
  console.log('UPDATE PACKAGE - INICIO')
  console.log(`Fecha: ${timestamp}`)
  console.log(`Método: ${req.method}`)
  console.log(`Ruta: ${req.originalUrl || req.url}`)
  console.log(`IP: ${req.ip || req.connection.remoteAddress}`)
  console.log(`User Agent: ${req.get('User-Agent')}`)
  console.log('Usuario (req.user):', JSON.stringify(req.user, null, 2))
  console.log('Session (req.session):', JSON.stringify(req.session, null, 2))
  console.log('Params:', JSON.stringify(req.params, null, 2))
  console.log('Query:', JSON.stringify(req.query, null, 2))
  console.log('Body:', JSON.stringify(req.body, null, 2))
  console.log('==========================')

  try {
    const pkg = await Package.findById(req.params.id)

    if (!pkg) {
      console.log('--- UPDATE PACKAGE NOT FOUND ---')
      console.log(`ID buscado: ${req.params.id}`)
      console.log('--------------------------------')
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

    if (req.body.availableDates) {
      pkg.availableDates = req.body.availableDates.map(item => ({
        date: item.date,
        hotel: item.hotel,
        hotelImage: item.hotelImage || ''
      }))
    }

    const updatedPkg = await pkg.save()

    console.log('--- UPDATE PACKAGE SUCCESS ---')
    console.log(`Acción realizada: Paquete actualizado correctamente`)
    console.log(`ID: ${updatedPkg._id}`)
    console.log(`Título: ${updatedPkg.title}`)
    console.log(`Usuario: ${req.user ? req.user.id || req.user._id || req.user.email : 'N/A (sin auth context)'}`)
    console.log('------------------------------')

    res.json(updatedPkg)
  } catch (error) {
    console.error('==========================')
    console.error('ERROR EN UPDATE PACKAGE')
    console.error(`Name: ${error.name}`)
    console.error(`Message: ${error.message}`)
    console.error(`Code: ${error.code || 'N/A'}`)
    console.error(`Stack: ${error.stack}`)
    console.error('==========================')

    res.status(500).json({
      message: error.message
    })
  }
}

/* =========================
   DELETE PACKAGE
========================= */
const deletePackage = async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log('==========================')
  console.log('DELETE PACKAGE - INICIO')
  console.log(`Fecha: ${timestamp}`)
  console.log(`Método: ${req.method}`)
  console.log(`Ruta: ${req.originalUrl || req.url}`)
  console.log(`IP: ${req.ip || req.connection.remoteAddress}`)
  console.log(`User Agent: ${req.get('User-Agent')}`)
  console.log('Usuario (req.user):', JSON.stringify(req.user, null, 2))
  console.log('Session (req.session):', JSON.stringify(req.session, null, 2))
  console.log('Params:', JSON.stringify(req.params, null, 2))
  console.log('Query:', JSON.stringify(req.query, null, 2))
  console.log('Body:', JSON.stringify(req.body, null, 2))
  console.log('==========================')

  try {
    const pkg = await Package.findById(req.params.id)

    if (!pkg) {
      console.log('--- DELETE PACKAGE NOT FOUND ---')
      console.log(`ID buscado: ${req.params.id}`)
      console.log('--------------------------------')
      return res.status(404).json({
        message: 'Package not found'
      })
    }

    const packageId = pkg._id
    const packageTitle = pkg.title

    await pkg.deleteOne()

    console.log('--- DELETE PACKAGE SUCCESS ---')
    console.log(`Acción realizada: Paquete eliminado correctamente`)
    console.log(`ID: ${packageId}`)
    console.log(`Título: ${packageTitle}`)
    console.log(`Usuario: ${req.user ? req.user.id || req.user._id || req.user.email : 'N/A (sin auth context)'}`)
    console.log('------------------------------')

    res.json({
      message: 'Package removed'
    })
  } catch (error) {
    console.error('==========================')
    console.error('ERROR EN DELETE PACKAGE')
    console.error(`Name: ${error.name}`)
    console.error(`Message: ${error.message}`)
    console.error(`Code: ${error.code || 'N/A'}`)
    console.error(`Stack: ${error.stack}`)
    console.error('==========================')

    res.status(500).json({
      message: error.message
    })
  }
}

/* =========================
   SEARCH PACKAGES
========================= */
const searchPackages = async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log('==========================')
  console.log('SEARCH PACKAGES - INICIO')
  console.log(`Fecha: ${timestamp}`)
  console.log(`Método: ${req.method}`)
  console.log(`Ruta: ${req.originalUrl || req.url}`)
  console.log(`IP: ${req.ip || req.connection.remoteAddress}`)
  console.log(`User Agent: ${req.get('User-Agent')}`)
  console.log('Usuario (req.user):', JSON.stringify(req.user, null, 2))
  console.log('Session (req.session):', JSON.stringify(req.session, null, 2))
  console.log('Params:', JSON.stringify(req.params, null, 2))
  console.log('Query:', JSON.stringify(req.query, null, 2))
  console.log('Body:', JSON.stringify(req.body, null, 2))
  console.log('==========================')

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

    console.log('--- SEARCH PACKAGES SUCCESS ---')
    console.log(`Acción realizada: Búsqueda de paquetes`)
    console.log(`Filtros aplicados: ${JSON.stringify(filters)}`)
    console.log(`Resultados encontrados: ${packages.length}`)
    console.log(`Usuario que realizó la acción: ${req.user ? req.user.id || req.user._id || req.user.email : 'Anónimo'}`)
    console.log('--------------------------------')

    res.json(packages)
  } catch (error) {
    console.error('==========================')
    console.error('ERROR EN SEARCH PACKAGES')
    console.error(`Name: ${error.name}`)
    console.error(`Message: ${error.message}`)
    console.error(`Code: ${error.code || 'N/A'}`)
    console.error(`Stack: ${error.stack}`)
    console.error('==========================')

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