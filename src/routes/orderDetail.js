const express = require('express')
const router = express.Router()
const orderDetailController = require('../controllers/orderDetail')
router
  .get('/', orderDetailController.getAllOrderDetail)
  .get('/:idsaya', orderDetailController.getOrderDetailById)
  .post('/', orderDetailController.insertOrderDetail)
  .put('/:id', orderDetailController.updateOrderDetail)
  .delete('/:id', orderDetailController.deleteOrderDetail)
module.exports = router
