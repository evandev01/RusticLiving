import express from 'express'
const router = express.Router()
import {
  createCustomProduct,
  getCustomProducts,
  getCustomProductById,
  updateCustomProduct,
  deleteCustomProduct,
} from '../controllers/customProductController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Calls functions in controller

router
  .route('/')
  .get(getCustomProducts)
  .post(protect, admin, createCustomProduct)
router
  .route('/:id')
  .get(getCustomProductById)
  .put(protect, admin, updateCustomProduct)
  .delete(protect, admin, deleteCustomProduct)

export default router
