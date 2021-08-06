const express = require('express')
const router = express.Router()
const orderDetailController = require('../controllers/orderDetail')
const auth = require('../middlewares/auth')
router
  .get('/', auth.verifyAccess, orderDetailController.getAllOrderDetail)
  .get('/:idsaya', auth.verifyAccess, orderDetailController.getOrderDetailById)
  .post('/', auth.verifyAccess, orderDetailController.insertOrderDetail)
  .put('/:id', auth.verifyAccess, orderDetailController.updateOrderDetail)
  .delete('/:id', auth.verifyAccess, orderDetailController.deleteOrderDetail)
module.exports = router
