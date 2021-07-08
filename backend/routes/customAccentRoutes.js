import express from 'express'
const router = express.Router()
import {
  createCustomAccent,
  getCustomAccents,
  getCustomAccentById,
  updateCustomAccent,
  deleteCustomAccent,
} from '../controllers/customAccentController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').get(getCustomAccents).post(protect, admin, createCustomAccent)
router
  .route('/:id')
  .get(getCustomAccentById)
  .put(protect, admin, updateCustomAccent)
  .delete(protect, admin, deleteCustomAccent)

export default router
