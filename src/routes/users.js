const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

router
  .get('/', userController.getAllUser)
  .post('/register', userController.register)
  .post('/login', userController.login)
  .get('/:idsaya', userController.getUserById)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser)
module.exports = router
