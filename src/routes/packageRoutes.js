const express = require('express');
const { getAllPackages, getPackageBySlug, getPackageById, createPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', getAllPackages);
router.get('/id/:id', getPackageById);
router.get('/:slug', getPackageBySlug);
router.post('/', protect, adminOnly, createPackage);
router.put('/:id', protect, adminOnly, updatePackage);
router.delete('/:id', protect, adminOnly, deletePackage);

module.exports = router;
