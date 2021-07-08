import express from 'express'
const router = express.Router()
import {
  createCustomSpecies,
  getCustomSpecies,
  getCustomSpeciesById,
  updateCustomSpecies,
  deleteCustomSpecies,
} from '../controllers/customSpeciesController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Calls functions in controller

router
  .route('/')
  .get(getCustomSpecies)
  .post(protect, admin, createCustomSpecies)
router
  .route('/:id')
  .get(getCustomSpeciesById)
  .put(protect, admin, updateCustomSpecies)
  .delete(protect, admin, deleteCustomSpecies)

export default router
