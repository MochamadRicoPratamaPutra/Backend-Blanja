const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
const upload = require('../middlewares/multer')
const auth = require('../middlewares/auth')
const redisCache = require('../middlewares/redis')
router
  .get('/', redisCache.hitCacheAllProduct, productController.getAllProduct)
  .get('/:idsaya', auth.verifyAccess, redisCache.hitCacheProductId, productController.getProductById)
  .post('/', auth.verifyAccess, upload.single('imgUrl'), productController.insertProduct)
  .put('/:id', auth.verifyAccess, productController.updateProduct)
  .delete('/:id', auth.verifyAccess, productController.deleteProduct)
module.exports = router
