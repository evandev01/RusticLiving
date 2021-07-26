import express from 'express'
const router = express.Router()
import {
  createAccent,
  getAccents,
  getAccentById,
  updateAccent,
  deleteAccent,
} from '../../controllers/customProductControllers/accentController.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').get(getAccents).post(protect, admin, createAccent)
router
  .route('/:id')
  .get(getAccentById)
  .put(protect, admin, updateAccent)
  .delete(protect, admin, deleteAccent)

export default router
