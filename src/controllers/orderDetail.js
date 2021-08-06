const orderDetailModel = require('../models/order_detail')
const helpers = require('../helpers/helpers')
const { v4: uuidv4 } = require('uuid')
const getAllOrderDetail = (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const column = req.query.column
  const search = req.query.search
  const sort = req.query.sort
  // const sortBy = sort.toUpperCase()
  const keyword = req.query.keyword
  orderDetailModel.getAllOrderDetail(page, limit, column, search, sort, keyword)
    .then((result) => {
      const orderDetail = result
      helpers.response(res, orderDetail, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}
const getOrderDetailById = (req, res, next) => {
  const id = req.params.idsaya
  orderDetailModel.getOrderDetailById(id)
    .then((result) => {
      const orderDetail = result
      helpers.response(res, orderDetail, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}
const insertOrderDetail = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const { total, userID } = req.body
  const data = {
    total: total,
    userID: userID,
    createdAt: new Date()
  }
  orderDetailModel.insertOrderDetail(data)
    .then((result) => {
      helpers.response(res, data, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}

const updateOrderDetail = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const id = req.params.id
  const { userID, total } = req.body
  const data = {
    id: id,
    userID: userID,
    total: total,
    modifiedAt: new Date()
  }
  orderDetailModel.updateOrderDetail(id, data)
    .then(() => {
      res.json({
        message: 'data berhasil di insert',
        data: data
      })
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}

const deleteOrderDetail = (req, res, next) => {
  const id = req.params.id
  orderDetailModel.deleteOrderDetail(id)
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
  getAllOrderDetail,
  getOrderDetailById,
  insertOrderDetail,
  updateOrderDetail,
  deleteOrderDetail
}
