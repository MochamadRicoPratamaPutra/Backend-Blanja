const orderItemsModel = require('../models/orderItems')
const helpers = require('../helpers/helpers')
const createError = require('http-errors')
const getAllOrderItems = (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const column = req.query.column
  const search = req.query.search
  const sort = req.query.sort
  // const sortBy = sort.toUpperCase()
  const keyword = req.query.keyword
  orderItemsModel.getAllOrderItems(page, limit, column, search, sort, keyword)
    .then((result) => {
      const orderItems = result
      helpers.response(res, orderItems, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}
const getOrderItemsById = (req, res, next) => {
  const id = req.params.idsaya
  console.log(id)
  orderItemsModel.getOrderItemsById(id)
    .then((result) => {
      const orderItems = result
      helpers.response(res, orderItems, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}
const insertOrderItems = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const { userID, quantity, productsID, orderID } = req.body
  const data = {
    userID: userID,
    productsID: productsID,
    quantity: quantity,
    orderID: orderID,
    createdAt: new Date()
  }
  orderItemsModel.insertOrderItems(data)
    .then(() => {
      helpers.response(res, data, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}

const deleteOrderItems = (req, res, next) => {
  const id = req.params.id
  orderItemsModel.deleteOrderItems(id)
    .then(() => {
      res.status(200)
      res.json({
        message: 'data berhasil di hapus'
      })
    })
    .catch((err) => {
      console.log(err)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}
module.exports = {
  getAllOrderItems,
  getOrderItemsById,
  insertOrderItems,
  deleteOrderItems
}
