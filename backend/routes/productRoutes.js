import express from 'express'
const router = express.Router()
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js'

// Calls getProducts function in productController
router.route('/').get(getProducts)

// Calls getProductId function in productController
router.route('/:id').get(getProductById)

export default router
