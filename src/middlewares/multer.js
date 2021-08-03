const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(''), 'src/upload'))
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 3 } })

module.exports = upload
