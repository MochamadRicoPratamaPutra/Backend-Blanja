const addressModel = require('../models/address')
const helpers = require('../helpers/helpers')
const createError = require('http-errors')
// const fs = require('fs')
const getAllAddress = (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const column = req.query.column
    const search = req.query.search
    const sort = req.query.sort
    // const sortBy = sort.toUpperCase()
    const keyword = req.query.keyword
    addressModel.getAllAddress(page, limit, column, search, sort, keyword)
        .then((result) => {
            const address = result
            helpers.response(res, address, 200)
        })
        .catch((error) => {
            console.log(error)
            const errorMessage = new createError.InternalServerError()
            next(errorMessage)
        })
}
const getAddressById = (req, res, next) => {
    const id = req.params.idsaya
    console.log(id)
    addressModel.getAddressById(id)
        .then((result) => {
            const address = result
            helpers.response(res, address, 200)
        })
        .catch((error) => {
            console.log(error)
            const errorMessage = new createError.InternalServerError()
            next(errorMessage)
        })
}

const insertAddress = (req, res, next) => {
    // const name = req.body.name
    // const price = req.body.price
    // const description =req.body.description
    const { userId, type, recipientName, recipientNumber, address, postalCode, city, addressPrimary } = req.body
    const data = {
        userId: userId,
        recipientName: recipientName,
        recipientNumber: recipientNumber,
        address: address,
        postalCode: postalCode,
        city: city,
        type: type,
        addressPrimary: addressPrimary
    }
    // fs.unlinkSync(path.dirname(''))
    addressModel.insertAddress(data)
        .then(() => {
            // console.log(res)
            helpers.response(res, data, 200)
        })
        .catch((error) => {
            console.log(error)
            const errorMessage = new createError.InternalServerError()
            next(errorMessage)
        })
}

const updateAddress = (req, res, next) => {
    // const name = req.body.name
    // const price = req.body.price
    // const description =req.body.description
    const id = req.params.id
    const { userId, type, recipientName, recipientNumber, address, postalCode, city, addressPrimary } = req.body
    const data = {
        userId: userId,
        recipientName: recipientName,
        recipientNumber: recipientNumber,
        address: address,
        postalCode: postalCode,
        city: city,
        type: type,
        addressPrimary: addressPrimary
    }
    addressModel.updateAddress(id, data)
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

const deleteAddress = (req, res, next) => {
    const id = req.params.id
    addressModel.deleteAddress(id)
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
    getAllAddress,
    getAddressById,
    insertAddress,
    updateAddress,
    deleteAddress
}
