const express = require('express')
const route = express.Router()
const productRouter = require('./products')
const categoryRouter = require('./category')
const userRouter = require('./users')
const orderDetailRouter = require('./orderDetail')
route
  .use('/products', productRouter)
  .use('/category', categoryRouter)
  .use('/users', userRouter)
  .use('/order-detail', orderDetailRouter)
module.exports = route
