const { SitemapStream, streamToPromise } = require('sitemap')
const Package = require('../models/Package')

const getSitemap = async (req, res) => {
  try {
    const sitemap = new SitemapStream({
      hostname: 'https://www.nyc-travel.com.ar'
    })

    // Páginas fijas
    sitemap.write({
      url: '/',
      changefreq: 'daily',
      priority: 1.0
    })

    sitemap.write({
      url: '/packages',
      changefreq: 'daily',
      priority: 0.9
    })

    sitemap.write({
      url: '/contact',
      changefreq: 'monthly',
      priority: 0.7
    })

    sitemap.write({
      url: '/quienes-somos',
      changefreq: 'monthly',
      priority: 0.7
    })

    // Paquetes dinámicos
    const packages = await Package.find({}, 'slug updatedAt')

    packages.forEach(pkg => {
      sitemap.write({
        url: `/packages/${pkg.slug}`,
        lastmod: pkg.updatedAt,
        changefreq: 'weekly',
        priority: 0.8
      })
    })

    sitemap.end()

    const xml = await streamToPromise(sitemap)

    res.header('Content-Type', 'application/xml')
    res.send(xml.toString())

  } catch (error) {
    console.error(error)
    res.status(500).send('Error generando sitemap')
  }
}

module.exports = {
  getSitemap
}