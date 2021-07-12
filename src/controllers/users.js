const userModel = require('../models/users')
const { v4: uuidv4 } = require('uuid')
const helpers = require('../helpers/helpers')
const createError = require('http-errors')

const getAllUser = (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const column = req.query.column
  const search = req.query.search
  const sort = req.query.sort
  // const sortBy = sort.toUpperCase()
  const keyword = req.query.keyword
  userModel.getAllUser(page, limit, column, search, sort, keyword)
    .then((result) => {
      const users = result
      helpers.response(res, users, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}
const getUserById = (req, res, next) => {
  const id = req.params.idsaya
  userModel.getUserById(id)
    .then((result) => {
      const users = result
      helpers.response(res, users, 200)
    })
    .catch((error) => {
      console.log(error)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}

const insertUser = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const { name, email, password, phoneNumber, gender } = req.body
  const data = {
    id: uuidv4(),
    name: name,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    gender: gender,
    createdAt: new Date()
  }

  userModel.insertUser(data)
    .then((result) => {
      helpers.response(res, { data }, 200)
    })
    .catch((error) => {
      console.log(error)

      helpers.response(res, null, 500, { message: 'internal server error' })
    })
}

const updateUser = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const id = req.params.id
  const { name, email, password, phoneNumber, gender } = req.body
  const data = {
    name: name,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    gender: gender,
    modifiedAt: new Date()
  }
  userModel.updateUser(id, data)
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

const deleteUser = (req, res, next) => {
  const id = req.params.id
  userModel.deleteUser(id)
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
  getAllUser,
  getUserById,
  insertUser,
  updateUser,
  deleteUser
}
