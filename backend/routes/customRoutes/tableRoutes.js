import express from 'express'
const router = express.Router()
import {
  createTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
} from '../../controllers/customProductControllers/tableController.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').get(getTables).post(protect, admin, createTable)
router
  .route('/:id')
  .get(getTableById)
  .put(protect, admin, updateTable)
  .delete(protect, admin, deleteTable)

export default router
