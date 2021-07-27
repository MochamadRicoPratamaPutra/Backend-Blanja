const userModel = require('../models/users')
const { v4: uuidv4 } = require('uuid')
const helpers = require('../helpers/helpers')
const createError = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    createdAt: new Date()
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

const register = async (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const { name, email, password, phoneNumber, gender } = req.body

  const user = await userModel.findUser(email)
  if (user.length > 0) {
    return helpers.response(res, null, 401, { message: 'email sudah ada' })
  }
  console.log(user)
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash)
      const data = {
        id: uuidv4(),
        name: name,
        email: email,
        password: hash,
        phoneNumber: phoneNumber,
        gender: gender,
        createdAt: new Date()
      }
      userModel.insertUser(data)
        .then((result) => {
          delete data.password
          helpers.response(res, data, 200)
        })
        .catch((error) => {
          console.log(error)
          helpers.response(res, null, 500, { message: 'internal server error' })
        })
    })
  })
}
const login = async (req, res, next) => {
  const { email, password } = req.body
  const result = await userModel.findUser(email)
  const user = result[0]
  console.log(user)
  bcrypt.compare(password, user.password, function (err, resCompare) {
    // console.log(resCompare)
    if (!resCompare) {
      return helpers.response(res, null, 401, { message: 'password wrong' })
    }
    // generate token
    jwt.sign({ email: user.email, role: '1' }, process.env.SECRET_KEY, { expiresIn: 60 * 60 }, function (err, token) {
      // console.log(token)
      // console.log(process.env.SECRET_KEY)
      delete user.password
      user.token = token
      helpers.response(res, user, 200)
    })
  })
}
module.exports = {
  getAllUser,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  register,
  login
}
