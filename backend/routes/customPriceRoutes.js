import express from 'express'
const router = express.Router()
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
import {
  createTablePrice,
  deleteTablePrice,
  getTablePriceById,
  getTablePrices,
  updateTablePrice,
} from '../controllers/customPriceControllers/tablePriceController.js'
import {
  createBedFramePrice,
  deleteBedFramePrice,
  getBedFramePriceById,
  getBedFramePrices,
  updateBedFramePrice,
} from '../controllers/customPriceControllers/bedFramePriceController.js'
import {
  createDoorPrice,
  deleteDoorPrice,
  getDoorPriceById,
  getDoorPrices,
  updateDoorPrice,
} from '../controllers/customPriceControllers/doorPriceController.js'

// Table price routes
router
  .route('/table')
  .get(getTablePrices)
  .post(protect, admin, createTablePrice)
router
  .route('/table/:id')
  .get(getTablePriceById)
  .put(protect, admin, updateTablePrice)
  .delete(protect, admin, deleteTablePrice)

// Bed frame price routes
router
  .route('/bedframe')
  .get(getBedFramePrices)
  .post(protect, admin, createBedFramePrice)
router
  .route('/bedframe/:id')
  .get(getBedFramePriceById)
  .put(protect, admin, updateBedFramePrice)
  .delete(protect, admin, deleteBedFramePrice)

// Door price routes
router.route('/door').get(getDoorPrices).post(protect, admin, createDoorPrice)
router
  .route('/door/:id')
  .get(getDoorPriceById)
  .put(protect, admin, updateDoorPrice)
  .delete(protect, admin, deleteDoorPrice)

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
