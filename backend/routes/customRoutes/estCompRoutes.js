import express from 'express'
const router = express.Router()
import {
  getEstCompDates,
  createEstCompDate,
  updateEstCompDate,
  deleteEstCompDate,
  getEstCompDateById,
} from '../../controllers/customProductControllers/estCompDateController.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

router.route('/').get(getEstCompDates).post(protect, admin, createEstCompDate)
router
  .route('/:id')
  .get(getEstCompDateById)
  .put(protect, admin, updateEstCompDate)
  .delete(protect, admin, deleteEstCompDate)

export default router
