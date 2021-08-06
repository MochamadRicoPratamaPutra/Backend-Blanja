const express = require('express')
const router = express.Router()
const orderItemsController = require('../controllers/orderItems')
const auth = require('../middlewares/auth')
router
    .get('/', auth.verifyAccess, orderItemsController.getAllOrderItems)
    .get('/:idsaya', auth.verifyAccess, orderItemsController.getOrderItemsById)
    .post('/', auth.verifyAccess, orderItemsController.insertOrderItems)
    .delete('/:id', auth.verifyAccess, orderItemsController.deleteOrderItems)
module.exports = router
