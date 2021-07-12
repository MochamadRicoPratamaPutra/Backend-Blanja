// const express = require('express')
// const connection = require('../controllers/db')
// const router = express.Router()

// router
//     .get('/', (req, res)=>{
//         connection.query('SELECT * FROM product', (error, result)=>{
//             const data = result
//             res.json({
//                 message: 'data success to get',
//                 product: data
//             })
//         })
//     })
//     .post('/', (req, res)=>{
//         res.send('ini method post product')
//     })

// module.exports = router
const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
router
  .get('/', productController.getAllProduct)
  .get('/:idsaya', productController.getProductById)
// .get('/', productController.sortingTable)
// .get('/paginating', productController.paginatedResults)
  .post('/', productController.insertProduct)
  .put('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct)
module.exports = router
