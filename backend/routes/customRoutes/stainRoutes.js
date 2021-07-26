import express from 'express'
const router = express.Router()
import {
  createStain,
  getStains,
  getStainById,
  updateStain,
  deleteStain,
} from '../../controllers/customProductControllers/stainController.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').get(getStains).post(protect, admin, createStain)
router
  .route('/:id')
  .get(getStainById)
  .put(protect, admin, updateStain)
  .delete(protect, admin, deleteStain)

export default router
