const express = require('express')
const upload = require('../middlewares/upload')
const cloudinary = require('../config/cloudinary')

const router = express.Router()

router.post('/upload', upload.single('image'), (req, res) => {
  res.json({ url: req.file.path })
})

module.exports = router