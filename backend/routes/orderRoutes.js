import express from 'express'
const router = express.Router()
import { addOrderItems } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').post(protect, addOrderItems)

export default router
