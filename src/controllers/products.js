const productModel = require('../models/products')
const helpers = require('../helpers/helpers')
const createError = require('http-errors')
const path = require('path')
const redis = require('redis')
const client = redis.createClient(6379)
// const fs = require('fs')
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
      client.setex('allProduct', 60, JSON.stringify(products))
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
      client.setex(`product/${id}`, 60, JSON.stringify(products))
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
  const userRole = req.role
  console.log(userRole)
  if ((userRole === 'admin') || (userRole === 'seller')) {
    const { name, price, description, stock, categoryID } = req.body
    const data = {
      name: name,
      price: price,
      description: description,
      stock: stock,
      imgUrl: `${process.env.BASE_URL}/file/${req.file.filename}`,
      categoryID: categoryID,
      createdAt: new Date()
    }
    // fs.unlinkSync(path.dirname(''))
    console.log(path.extname(req.file.filename))
    if (path.extname(req.file.filename) === '.jpg') {
      productModel.insertProduct(data)
        .then(() => {
        // console.log(res)
          helpers.response(res, data, 200)
        })
        .catch((error) => {
          console.log(error)
          const errorMessage = new createError.InternalServerError()
          next(errorMessage)
        })
    } else {
      const errorMessage = new createError.UnsupportedMediaType()
      next(errorMessage)
    }
  } else {
    const errorMessage = new createError.Forbidden()
    next(errorMessage)
  }
}

const updateProduct = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const id = req.params.id
  const { name, price, description, stock, categoryID } = req.body
  const data = {
    name: name,
    price: price,
    description: description,
    stock: stock,
    imgUrl: `${process.env.BASE_URL}/file/${req.file.filename}`,
    categoryID: categoryID,
    updatedAt: new Date()
  }
  if (path.extname(req.file.filename) === '.jpg') {
    const userRole = req.role
    if ((userRole === 'admin') || (userRole === 'seller')) {
      productModel.updateProduct(id, data)
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
    } else {
      const errorMessage = new createError.Forbidden()
      next(errorMessage)
    }
  } else {
    const errorMessage = new createError.UnsupportedMediaType()
    next(errorMessage)
  }
}

const deleteProduct = (req, res, next) => {
  const id = req.params.id
  const userRole = req.role
  if ((userRole === 'admin') || (userRole === 'seller')) {
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
  } else {
    const errorMessage = new createError.Forbidden()
    next(errorMessage)
  }
}

module.exports = {
  getAllProduct,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct
}
