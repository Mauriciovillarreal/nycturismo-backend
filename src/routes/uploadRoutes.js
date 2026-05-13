const express = require('express');
const multer = require('multer');
const cloudinaryService = require('../services/cloudinaryService');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', protect, upload.single('image'), adminOnly, async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se envió imagen' });
    }
    const result = await cloudinaryService.uploadImage(req.file.buffer);
    res.json({ url: result.secure_url });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
