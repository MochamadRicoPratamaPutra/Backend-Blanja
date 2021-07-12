const connection = require('../controllers/db')

const getAllProduct = (page, limit, column, search, sortBy, keyword) => {
  return new Promise((resolve, reject) => {
    if (column !== undefined && sortBy !== undefined && keyword !== undefined && search !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatingResult = {}
        connection.query(`SELECT * FROM products WHERE ${search} LIKE '%${keyword}%' AND (id >= ${startIndex}) ORDER BY ${column} ${sortBy} LIMIT ${limit};`, (error, result) => {
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
        connection.query(`SELECT * FROM products ORDER BY ${column} ${sortBy}`, (error, result) => {
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
        connection.query(`SELECT * FROM products WHERE id >= ${startIndex} ORDER BY ${column} ${sortBy} LIMIT ${limit}`, (error, result) => {
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
        connection.query(`SELECT * FROM products ORDER BY ${column} ${sortBy}`, (error, result) => {
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
        connection.query(`SELECT * FROM products WHERE ${search} LIKE '%${keyword}%' AND (id >= ${startIndex}) LIMIT ${limit}`, (error, result) => {
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
        connection.query(`SELECT * FROM products WHERE ${search} LIKE '%${keyword}%'`, (error, result) => {
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
        connection.query(`SELECT * FROM products WHERE id >= ${startIndex} LIMIT ${limit}`, (error, result) => {
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
        connection.query('SELECT * FROM products LIMIT 5', (error, result) => {
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
const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM products INNER JOIN category ON products.categoryID = category.categoryID WHERE products.categoryID = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const insertProduct = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO products SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updateProduct = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE products SET ? WHERE id = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM products WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

module.exports = {
  getAllProduct,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct
}
