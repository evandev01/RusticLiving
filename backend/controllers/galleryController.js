import asyncHandler from 'express-async-handler'
import GalleryPhoto from '../models/galleryModel.js'

// @desc    Fetch all photos
// @route   GET /api/gallery
// @access  Public
const getPhotos = asyncHandler(async (req, res) => {
  const photos = await GalleryPhoto.find({})

  if (photos) {
    res.json(photos)
  } else {
    res.status(404)
    throw new Error('Photos not found')
  }
})

// @desc    Fetch single photo by ID
// @route   GET /api/gallery/:id
// @access  Public
const getPhotoById = asyncHandler(async (req, res) => {
  const photo = await GalleryPhoto.findById(req.params.id)

  if (photo) {
    res.json(photo)
  } else {
    res.status(404)
    throw new Error('Photo not found')
  }
})

// @desc    Create new photo
// @route   POST /api/gallery
// @access  Private/Admin
const createPhoto = asyncHandler(async (req, res) => {
  const { title, image, category, group } = req.body

  const photo = new GalleryPhoto({
    title: title,
    image: image,
    category: category,
    group: group,
    user: req.user._id,
  })

  const createdPhoto = await photo.save()
  res.status(201).json(createdPhoto)
})

// @desc    Update an photo
// @route   PUT /api/gallery/:id
// @access  Private/Admin
const updatePhoto = asyncHandler(async (req, res) => {
  const { title, image, category, group } = req.body

  const photo = await GalleryPhoto.findById(req.params.id)

  if (photo) {
    photo.title = title
    photo.image = image
    photo.category = category
    photo.group = group

    const updatedPhoto = photo.save()

    res.json(updatedPhoto)
  } else {
    res.status(404)
    throw new Error('Photo not found')
  }
})

// @desc    Delete an photo
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deletePhoto = asyncHandler(async (req, res) => {
  const photo = await GalleryPhoto.findById(req.params.id)

  if (photo) {
    await photo.remove()
    res.json({ message: 'Photo removed' })
  } else {
    res.status(404)
    throw new Error('Photo not found')
  }
})

export { getPhotos, getPhotoById, createPhoto, updatePhoto, deletePhoto }
