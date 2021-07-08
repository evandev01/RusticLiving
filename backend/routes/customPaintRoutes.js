import express from 'express'
const router = express.Router()
import {
  createCustomPaint,
  getCustomPaints,
  getCustomPaintById,
  updateCustomPaint,
  deleteCustomPaint,
} from '../controllers/customPaintController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').get(getCustomPaints).post(protect, admin, createCustomPaint)
router
  .route('/:id')
  .get(getCustomPaintById)
  .put(protect, admin, updateCustomPaint)
  .delete(protect, admin, deleteCustomPaint)

export default router
