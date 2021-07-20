import express from 'express'
const router = express.Router()
import {
  getSpeciesPrices,
  getSpeciesPriceById,
  createSpeciesPrice,
  updateSpeciesPrice,
  deleteSpeciesPrice,
} from '../controllers/customPriceControllers/speciesPriceController.js'
import {
  getAccentPrices,
  getAccentPriceById,
  createAccentPrice,
  updateAccentPrice,
  deleteAccentPrice,
} from '../controllers/customPriceControllers/accentPriceController.js'
import {
  getPaintPrices,
  getPaintPriceById,
  createPaintPrice,
  updatePaintPrice,
  deletePaintPrice,
} from '../controllers/customPriceControllers/paintPriceController.js'
import {
  getStainPrices,
  getStainPriceById,
  createStainPrice,
  updateStainPrice,
  deleteStainPrice,
} from '../controllers/customPriceControllers/stainPriceController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Species price routes
router
  .route('/species')
  .get(getSpeciesPrices)
  .post(protect, admin, createSpeciesPrice)
router
  .route('/species/:id')
  .get(getSpeciesPriceById)
  .put(protect, admin, updateSpeciesPrice)
  .delete(protect, admin, deleteSpeciesPrice)

// Accent price routes
router
  .route('/accent')
  .get(getAccentPrices)
  .post(protect, admin, createAccentPrice)
router
  .route('/accent/:id')
  .get(getAccentPriceById)
  .put(protect, admin, updateAccentPrice)
  .delete(protect, admin, deleteAccentPrice)

// Paint price routes
router
  .route('/paint')
  .get(getPaintPrices)
  .post(protect, admin, createPaintPrice)
router
  .route('/paint/:id')
  .get(getPaintPriceById)
  .put(protect, admin, updatePaintPrice)
  .delete(protect, admin, deletePaintPrice)

// Stain price routes
router
  .route('/stain')
  .get(getStainPrices)
  .post(protect, admin, createStainPrice)
router
  .route('/stain/:id')
  .get(getStainPriceById)
  .put(protect, admin, updateStainPrice)
  .delete(protect, admin, deleteStainPrice)

export default router
