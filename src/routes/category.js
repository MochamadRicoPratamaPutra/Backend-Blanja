const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')
const auth = require('../middlewares/auth')
router
  .get('/', categoryController.getAllCategory)
  .get('/:idsaya', categoryController.getCategoryById)
  .post('/', auth.verifyAccess, categoryController.insertCategory)
  .put('/:id', auth.verifyAccess, categoryController.updateCategory)
  .delete('/:id', auth.verifyAccess, categoryController.deleteCategory)
module.exports = router
