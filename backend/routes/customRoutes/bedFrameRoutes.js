import express from 'express'
const router = express.Router()
import {
  createBedFrame,
  getBedFrames,
  getBedFrameById,
  updateBedFrame,
  deleteBedFrame,
} from '../../controllers/customProductControllers/bedFrameController.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').get(getBedFrames).post(protect, admin, createBedFrame)
router
  .route('/:id')
  .get(getBedFrameById)
  .put(protect, admin, updateBedFrame)
  .delete(protect, admin, deleteBedFrame)

export default router
