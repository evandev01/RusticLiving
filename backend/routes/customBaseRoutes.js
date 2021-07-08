import express from 'express'
const router = express.Router()
import {
  createCustomBase,
  getCustomBases,
  getCustomBaseById,
  updateCustomBase,
  deleteCustomBase,
} from '../controllers/customBaseController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').get(getCustomBases).post(protect, admin, createCustomBase)
router
  .route('/:id')
  .get(getCustomBaseById)
  .put(protect, admin, updateCustomBase)
  .delete(protect, admin, deleteCustomBase)

export default router
