import express from 'express'
const router = express.Router()
import {
  createCustomStain,
  getCustomStains,
  getCustomStainById,
  updateCustomStain,
  deleteCustomStain,
} from '../controllers/customStainsController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').get(getCustomStains).post(protect, admin, createCustomStain)
router
  .route('/:id')
  .get(getCustomStainById)
  .put(protect, admin, updateCustomStain)
  .delete(protect, admin, deleteCustomStain)

export default router
