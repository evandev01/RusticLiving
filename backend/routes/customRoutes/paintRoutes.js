import express from 'express'
const router = express.Router()
import {
  createPaint,
  getPaints,
  getPaintById,
  updatePaint,
  deletePaint,
} from '../../controllers/customProductControllers/paintController.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').get(getPaints).post(protect, admin, createPaint)
router
  .route('/:id')
  .get(getPaintById)
  .put(protect, admin, updatePaint)
  .delete(protect, admin, deletePaint)

export default router
