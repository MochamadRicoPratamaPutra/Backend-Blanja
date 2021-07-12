const productModel = require('../models/products')
const helpers = require('../helpers/helpers')
const createError = require('http-errors')

const getAllProduct = (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const column = req.query.column
  const search = req.query.search
  const sort = req.query.sort
  // const sortBy = sort.toUpperCase()
  const keyword = req.query.keyword
  productModel.getAllProduct(page, limit, column, search, sort, keyword)
    .then((result) => {
      const products = result
      helpers.response(res, products, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}
const getProductById = (req, res, next) => {
  const id = req.params.idsaya
  productModel.getProductById(id)
    .then((result) => {
      const products = result
      helpers.response(res, products, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}

const insertProduct = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const { name, price, description, stock, imgUrl } = req.body
  const data = {
    name: name,
    price: price,
    description: description,
    stock: stock,
    imgUrl: imgUrl,
    createdAt: new Date()
  }
  productModel.insertProduct(data)
    .then(() => {
      helpers.response(res, data, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}

const updateProduct = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const id = req.params.id
  const { name, price, description, stock, imgUrl } = req.body
  const data = {
    name: name,
    price: price,
    description: description,
    stock: stock,
    imgUrl: imgUrl,
    // categoryID: categoryID,
    updatedAt: new Date()
  }
  productModel.updateProduct(id, data.next)
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

const deleteProduct = (req, res, next) => {
  const id = req.params.id
  productModel.deleteProduct(id)
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
  getAllProduct,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct
}
