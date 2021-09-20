const connection = require('../controllers/db')

const getAllOrderItems = (page, limit, column, search, sortBy, keyword) => {
  return new Promise((resolve, reject) => {
    if (column !== undefined && sortBy !== undefined && keyword !== undefined && search !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatingResult = {}
        connection.query(`SELECT * FROM order_items WHERE ${search} LIKE '%${keyword}%' AND (id >= ${startIndex}) ORDER BY ${column} ${sortBy} LIMIT ${limit};`, (error, result) => {
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
        connection.query(`SELECT * FROM order_items ORDER BY ${column} ${sortBy}`, (error, result) => {
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
        connection.query(`SELECT * FROM order_items WHERE id >= ${startIndex} ORDER BY ${column} ${sortBy} LIMIT ${limit}`, (error, result) => {
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
        connection.query(`SELECT * FROM order_items ORDER BY ${column} ${sortBy}`, (error, result) => {
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
        connection.query(`SELECT * FROM order_items WHERE ${search} LIKE '%${keyword}%' AND (id >= ${startIndex}) LIMIT ${limit}`, (error, result) => {
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
        connection.query(`SELECT * FROM order_items WHERE ${search} LIKE '%${keyword}%'`, (error, result) => {
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
        connection.query(`SELECT * FROM order_items WHERE id >= ${startIndex} LIMIT ${limit}`, (error, result) => {
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
        connection.query('SELECT * FROM order_items LIMIT 5', (error, result) => {
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
const insertOrderItems = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO order_items SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const deleteOrderItems = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM order_items WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
const getOrderItemsById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
            `SELECT order_detail.id, products.name, products.price, products.imgUrl, order_items.quantity FROM order_items 
            INNER JOIN order_detail ON order_items.orderID = order_detail.id
            INNER JOIN products ON order_items.productsID = products.id
            where order_items.orderID = '${id}'`, (error, result) => {
              if (!error) {
                resolve(result)
              } else {
                reject(error)
              }
            })
  })
}
module.exports = {
  getAllOrderItems,
  getOrderItemsById,
  insertOrderItems,
  deleteOrderItems
}
