import express from 'express'
const router = express.Router()
import {
  getEstCompDate,
  createEstCompDate,
  updateEstCompDate,
  deleteEstCompDate,
} from '../../controllers/customProductControllers/estCompDateController.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

router.route('/').get(getEstCompDate).post(protect, admin, createEstCompDate)
router
  .route('/:id')
  .put(protect, admin, updateEstCompDate)
  .delete(protect, admin, deleteEstCompDate)

export default router
