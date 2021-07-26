import express from 'express'
const router = express.Router()
import {
  getCustomPreOrders,
  getCustomPreOrderById,
  createCustomPreOrder,
  updateCustomPreOrder,
  deleteCustomPreOrder,
} from '../controllers/customPreOrderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Calls functions in controller

router
  .route('/')
  .post(protect, createCustomPreOrder)
  .get(protect, admin, getCustomPreOrders)
router
  .route('/:id')
  .get(protect, getCustomPreOrderById)
  .put(protect, updateCustomPreOrder)
  .delete(protect, deleteCustomPreOrder)

export default router
