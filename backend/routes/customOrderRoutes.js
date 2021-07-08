import express from 'express'
const router = express.Router()
import {
  addCustomOrderItems,
  getCustomOrderById,
  updateCustomOrderToPaid,
  updateCustomOrderToDelivered,
  getMyCustomOrders,
  getCustomOrders,
} from '../controllers/customOrderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Calls functions in controller

router
  .route('/')
  .post(protect, addCustomOrderItems)
  .get(protect, admin, getCustomOrders)
router.route('/mycustomorders').get(protect, getMyCustomOrders)
router.route('/:id').get(protect, getCustomOrderById)
router.route('/:id/pay').put(protect, updateCustomOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateCustomOrderToDelivered)

export default router
