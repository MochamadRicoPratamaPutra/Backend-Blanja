const connection = require('../controllers/db')

const getAllAddress = (page, limit, column, search, sortBy, keyword) => {
  return new Promise((resolve, reject) => {
    if (column !== undefined && sortBy !== undefined && keyword !== undefined && search !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatingResult = {}
        connection.query(`SELECT * FROM address WHERE ${search} LIKE '%${keyword}%' AND (id >= ${startIndex}) ORDER BY ${column} ${sortBy} LIMIT ${limit};`, (error, result) => {
          if (!error) {
            if (endIndex < result.length) {
              paginatingResult.next = {
                page: page + 1,
                limit: limit
              }
            }
            if (startIndex > 0) {
              paginatingResult.previous = {
                page: page - 1,
                limit: limit
              }
            }
            paginatingResult.result = result
            resolve(paginatingResult)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query(`SELECT * FROM address ORDER BY ${column} ${sortBy}`, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      }
    } else if (column !== undefined && sortBy !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatingResult = {}
        connection.query(`SELECT * FROM address WHERE id >= ${startIndex} ORDER BY ${column} ${sortBy} LIMIT ${limit}`, (error, result) => {
          if (!error) {
            if (endIndex < result.length) {
              paginatingResult.next = {
                page: page + 1,
                limit: limit
              }
            }
            if (startIndex > 0) {
              paginatingResult.previous = {
                page: page - 1,
                limit: limit
              }
            }
            paginatingResult.result = result
            resolve(paginatingResult)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query(`SELECT * FROM address ORDER BY ${column} ${sortBy}`, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      }
    } else if (keyword !== undefined && search !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatingResult = {}
        connection.query(`SELECT * FROM address WHERE ${search} LIKE '%${keyword}%' AND (id >= ${startIndex}) LIMIT ${limit}`, (error, result) => {
          if (!error) {
            if (endIndex < result.length) {
              paginatingResult.next = {
                page: page + 1,
                limit: limit
              }
            }
            if (startIndex > 0) {
              paginatingResult.previous = {
                page: page - 1,
                limit: limit
              }
            }
            paginatingResult.result = result
            resolve(paginatingResult)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query(`SELECT * FROM address WHERE ${search} LIKE '%${keyword}%'`, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      }
    } else {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatingResult = {}
        connection.query(`SELECT * FROM address WHERE id >= ${startIndex} LIMIT ${limit}`, (error, result) => {
          if (!error) {
            const jsonLength = result
            console.log(jsonLength.length)
            if (endIndex < Object.keys(result).length) {
              paginatingResult.next = {
                page: page + 1,
                limit: limit
              }
            }
            if (startIndex > 0) {
              paginatingResult.previous = {
                page: page - 1,
                limit: limit
              }
            }
            paginatingResult.result = result
            resolve(paginatingResult)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query('SELECT * FROM address', (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      }
    }
  })
}
const getAddressById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM address WHERE userId = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const insertAddress = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO address SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updateAddress = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE address SET ? WHERE id = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const deleteAddress = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM address WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

module.exports = {
  getAllAddress,
  getAddressById,
  insertAddress,
  updateAddress,
  deleteAddress
}
