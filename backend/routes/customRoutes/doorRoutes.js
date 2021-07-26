import express from 'express'
const router = express.Router()
import {
  createDoor,
  getDoors,
  getDoorById,
  updateDoor,
  deleteDoor,
} from '../../controllers/customProductControllers/doorController.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').get(getDoors).post(protect, admin, createDoor)
router
  .route('/:id')
  .get(getDoorById)
  .put(protect, admin, updateDoor)
  .delete(protect, admin, deleteDoor)

export default router
