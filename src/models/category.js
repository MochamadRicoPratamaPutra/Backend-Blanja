const connection = require('../controllers/db')

const getAllCategory = (page, limit, column, search, sortBy, keyword) => {
  return new Promise((resolve, reject) => {
    if (column !== undefined && sortBy !== undefined && keyword !== undefined && search !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatingResult = {}
        connection.query(`SELECT * FROM category WHERE ${search} LIKE '%${keyword}%' AND (categoryID >= ${startIndex}) ORDER BY ${column} ${sortBy} LIMIT ${limit};`, (error, result) => {
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
        connection.query(`SELECT * FROM category ORDER BY ${column} ${sortBy}`, (error, result) => {
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
        connection.query(`SELECT * FROM category WHERE categoryID >= ${startIndex} ORDER BY ${column} ${sortBy} LIMIT ${limit}`, (error, result) => {
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
        connection.query(`SELECT * FROM category ORDER BY ${column} ${sortBy}`, (error, result) => {
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
        connection.query(`SELECT * FROM category WHERE ${search} LIKE '%${keyword}%' AND (categoryID >= ${startIndex}) LIMIT ${limit}`, (error, result) => {
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
        connection.query(`SELECT * FROM category WHERE ${search} LIKE '%${keyword}%'`, (error, result) => {
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
        connection.query(`SELECT * FROM category WHERE categoryID >= ${startIndex} LIMIT ${limit}`, (error, result) => {
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
        connection.query('SELECT * FROM category LIMIT 5', (error, result) => {
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
const insertCategory = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO category SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updateCategory = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE category SET ? WHERE categoryID = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM category WHERE categoryID = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
const getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT products.id, products.name, products.price, products.imgUrl FROM `products` INNER JOIN category ON products.categoryID = category.categoryID WHERE category.categoryID = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
module.exports = {
  getAllCategory,
  insertCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
}
