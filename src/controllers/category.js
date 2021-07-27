const categoryModel = require('../models/category')
const helpers = require('../helpers/helpers')
const createError = require('http-errors')

const getAllCategory = (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const column = req.query.column
  const search = req.query.search
  const sort = req.query.sort
  // const sortBy = sort.toUpperCase()
  const keyword = req.query.keyword
  categoryModel.getAllCategory(page, limit, column, search, sort, keyword)
    .then((result) => {
      const category = result
      helpers.response(res, category, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}
const getCategoryById = (req, res, next) => {
  const id = req.params.idsaya
  categoryModel.getCategoryById(id)
    .then((result) => {
      const category = result
      helpers.response(res, category, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}
const insertCategory = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const { categoryID } = req.body
  const data = {
    categoryID: categoryID,
    createdAt: new Date()
  }
  categoryModel.insertCategory(data)
    .then(() => {
      helpers.response(res, data, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}

const updateCategory = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const id = req.params.id
  const { categoryID } = req.body
  const data = {
    categoryID: categoryID,
    updatedAt: new Date()
  }
  categoryModel.updateCategory(id, data)
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

const deleteCategory = (req, res, next) => {
  const id = req.params.id
  categoryModel.deleteCategory(id)
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
  getAllCategory,
  getCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory
}
