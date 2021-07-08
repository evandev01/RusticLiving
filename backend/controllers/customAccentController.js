import asyncHandler from 'express-async-handler'
import CustomAccent from '../models/customProductModels/customAccentModel.js'

// @desc    Fetch all custom accents
// @route   GET /api/customaccents
// @access  Public
const getCustomAccents = asyncHandler(async (req, res) => {
  const customAccents = await CustomAccent.find({})

  if (customAccents) {
    res.json(customAccents)
  } else {
    res.status(404)
    throw new Error('Custom accent not found')
  }
})

// @desc    Fetch single custom accent
// @route   GET /api/customaccents/:id
// @access  Public
const getCustomAccentById = asyncHandler(async (req, res) => {
  const customAccent = await CustomAccent.findById(req.params.id)

  if (customAccent) {
    res.json(customAccent)
  } else {
    res.status(404)
    throw new Error('Custom accent not found')
  }
})

// @desc    Create a new custom accent
// @route   POST /api/customaccents
// @access  Private/Admin
const createCustomAccent = asyncHandler(async (req, res) => {
  const { accentName, accentImage } = req.body

  const customAccent = new CustomAccent({
    accentName: accentName,
    accentImage: accentImage,
    user: req.user._id,
  })

  const createdCreatedCustomAccent = await customAccent.save()
  res.status(201).json(createdCreatedCustomAccent)
})

// @desc    Update a custom accent
// @route   PUT /api/customaccents/:id
// @access  Private/Admin

const updateCustomAccent = asyncHandler(async (req, res) => {
  const { accentName, accentImage } = req.body

  const customAccent = await CustomAccent.findById(req.params.id)

  if (customAccent) {
    customAccent.accentName = accentName
    customAccent.accentImage = accentImage

    const updatedCustomAccent = await customAccent.save()

    res.json(updatedCustomAccent)
  } else {
    res.status(404)
    throw new Error('Custom accent not found')
  }
})

// @desc    Delete a custom accent
// @route   DELETE /api/customaccents/:id
// @access  Private/Admin
const deleteCustomAccent = asyncHandler(async (req, res) => {
  const customAccent = await CustomAccent.findById(req.params.id)

  if (customAccent) {
    await customAccent.remove()
    res.json({ message: 'Custom accent removed' })
  } else {
    res.status(404)
    throw new Error('Custom accent not found')
  }
})

export {
  getCustomAccents,
  getCustomAccentById,
  createCustomAccent,
  updateCustomAccent,
  deleteCustomAccent,
}
