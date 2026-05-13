const express = require('express')
const {
  getPackages,
  getPackageBySlug,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} = require('../controllers/packageController')
const { protect, admin } = require('../middlewares/auth')

const router = express.Router()

router.get('/', getPackages)
router.get('/id/:id', getPackageById)
router.get('/:slug', getPackageBySlug)
router.post('/', protect, admin, createPackage)
router.put('/:id', protect, admin, updatePackage)
router.delete('/:id', protect, admin, deletePackage)

module.exports = router