import express from 'express'
const router = express.Router()
import {
  getPhotos,
  getPhotoById,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from '../controllers/galleryController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Calls functions in controller

router.route('/').get(getPhotos).post(protect, admin, createPhoto)
router
  .route('/:id')
  .get(getPhotoById)
  .put(protect, admin, updatePhoto)
  .delete(protect, admin, deletePhoto)

export default router
