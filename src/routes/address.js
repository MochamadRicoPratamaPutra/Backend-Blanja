const express = require('express')
const router = express.Router()
const addressController = require('../controllers/address')
router
    .get('/', addressController.getAllAddress)
    .get('/:idsaya', addressController.getAddressById)
    .post('/', addressController.insertAddress)
    .put('/:id', addressController.updateAddress)
    .delete('/:id', addressController.deleteAddress)
module.exports = router
