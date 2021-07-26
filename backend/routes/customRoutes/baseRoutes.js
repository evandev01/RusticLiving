import express from 'express'
const router = express.Router()
import {
  createBase,
  getBases,
  getBaseById,
  updateBase,
  deleteBase,
} from '../../controllers/customProductControllers/baseController.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').get(getBases).post(protect, admin, createBase)
router
  .route('/:id')
  .get(getBaseById)
  .put(protect, admin, updateBase)
  .delete(protect, admin, deleteBase)

export default router
