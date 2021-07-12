require('dotenv').config()
const express = require('express')
const app = express()
const productRouter = require('./src/routes/products')
const categoryRouter = require('./src/routes/category')
const userRouter = require('./src/routes/users')
const orderDetailRouter = require('./src/routes/orderDetail')
const port = process.env.PORT || 3500
// const setCors = require('./src/middlewares/cors')
const cors = require('cors')
const createError = require('http-errors')

// middleware
const mymiddleware = (req, res, next) => {
  console.log('My middleware dijalankan')
  const email = 'rico00730@gmail.com'
  req.myemail = email
  next()
}
app.use(mymiddleware)
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/products', productRouter)
app.use('/category', categoryRouter)
app.use('/users', userRouter)
app.use('/order-detail', orderDetailRouter)
app.use('*', (req, res, next) => {
  const error = new createError.NotFound()
  next(error)
})
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({
    message: err.message
  })
})
app.listen(port, () => {
  console.log('server is running on port ' + port)
})
