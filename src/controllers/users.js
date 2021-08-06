const userModel = require('../models/users')
const { v4: uuidv4 } = require('uuid')
const helpers = require('../helpers/helpers')
const createError = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const common = require('../helpers/common')
const path = require('path')
const confirmForgot = require('../helpers/confirmForgot')

const getAllUser = (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const column = req.query.column
  const search = req.query.search
  const sort = req.query.sort
  // const sortBy = sort.toUpperCase()
  const userRole = req.role
  if (userRole === 'admin') {
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
  } else {
    const errorMessage = new createError.Forbidden()
    next(errorMessage)
  }
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

// const insertUser = (req, res, next) => {
//   const { name, email, password, phoneNumber, gender } = req.body
//   const data = {
//     id: uuidv4(),
//     name: name,
//     email: email,
//     password: password,
//     phoneNumber: phoneNumber,
//     gender: gender,
//     createdAt: new Date()
//   }
//   userModel.insertUser(data)
//     .then((result) => {
//       helpers.response(res, { data }, 200)
//     })
//     .catch((error) => {
//       console.log(error)
//       helpers.response(res, null, 500, { message: 'internal server error' })
//     })
// }

const updateUser = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const id = req.params.id
  const userRole = req.role
  const userId = req.id
  const { name, email, password, phoneNumber, gender } = req.body
  if (userRole === 'customer' || userRole === 'seller') {
    if (id === userId) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          const data = {
            name: name,
            email: email,
            // password: hash,
            phoneNumber: phoneNumber,
            gender: gender,
            profilePicture: `${process.env.BASE_URL}/file/${req.file.filename}`,
            updatedAt: new Date()
          }
          userModel.updateUser(id, data)
            .then(() => {
              res.json({
                message: 'data successfuly updated',
                data: data
              })
            })
            .catch((error) => {
              console.log(error)
              const errorMessage = new createError.InternalServerError()
              next(errorMessage)
            })
        })
      })
    } else {
      const errorMessage = new createError.Forbidden()
      next(errorMessage)
    }
  } else {
    const errorMessage = new createError.Forbidden()
    next(errorMessage)
  }
}

const deleteUser = (req, res, next) => {
  const id = req.params.id
  const userRole = req.role
  if (userRole === 'admin') {
    userModel.deleteUser(id)
      .then(() => {
        res.status(200)
        res.json({
          message: 'data successfuly deleted'
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
const verificationUser = (req, res, next) => {
  const id = req.params.id
  const userId = req.id
  console.log(id)
  userModel.verification(id)
    .then((result) => {
      const validate = result.changedRows
      if (validate) {
        res.status(200)
        res.json({
          message: 'User success to verified'
        })
      } else {
        const errorMessage = new createError.Unauthorized("Email isn't in database")
        next(errorMessage)
      }
    })
    .catch((err) => {
      console.log(err)
      const errorMessage = new createError.InternalServerError()
      next(errorMessage)
    })
}
const sendEmailForgot = (req, res, next) => {
  const {email} = req.body
  const user = userModel.findUser(email)
  if (user.length !== 0) {
    confirmForgot.main(email)
    helpers.response(res, {message: 'Check your mail to change your password'}, 200)
  } else {
    helpers.response(res, null, 500, { message: 'internal server error' })
  }
}
const forgotPassword = async (req, res, next) => {
  const email = req.params.email
  const {password} = req.body
  const user = await userModel.findUser(email)
  if (user.length !== 0) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          password: hash
        }
        console.log(data)
        console.log(email)
        userModel.updateUserByEmail(email, data)
          .then((result) => {
            // common.main(data.name, data.email, data.id)
            delete data.password
            helpers.response(res, {message: 'Success updating password'}, 200)
          })
          .catch((err) => {
            console.log(err)
            helpers.response(res, null, 500, { message: 'internal server error' })
          })
      })
    })
  } else {
    helpers.response(res, null, 500, { message: 'internal server error' })
  }
}
const register = async (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const { name, email, password, phoneNumber, gender, role, storeName } = req.body
  const user = await userModel.findUser(email)
  if (user.length > 0) {
    return helpers.response(res, null, 401, { message: 'email already registered' })
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
        role: role,
        storeName: storeName,
        // profilePicture: `${process.env.BASE_URL}/file/${req.file.filename}`,
        createdAt: new Date()
      }
      // if (path.extname(req.file.filename) === '.jpg'){
      userModel.insertUser(data)
        .then((result) => {
          common.main(data.name, data.email, data.id)
          delete data.password
          helpers.response(res, data, 200)
        })
        .catch((error) => {
          console.log(error)
          helpers.response(res, null, 500, { message: 'internal server error' })
        })
      // }
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
    jwt.sign({ email: user.email, role: user.role, id: user.id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 }, function (err, token) {
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
  // insertUser,
  updateUser,
  deleteUser,
  register,
  login,
  verificationUser,
  sendEmailForgot,
  forgotPassword
}
