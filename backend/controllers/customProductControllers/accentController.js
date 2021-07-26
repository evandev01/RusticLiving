import asyncHandler from 'express-async-handler'
import Accent from '../../models/customProductModels/accentModel.js'

// @desc    Fetch all accents
// @route   GET /api/custom/accent
// @access  Public
const getAccents = asyncHandler(async (req, res) => {
  const accents = await Accent.find({})

  if (accents) {
    res.json(accents)
  } else {
    res.status(404)
    throw new Error('Accents not found')
  }
})

// @desc    Fetch single accent by ID
// @route   GET /api/custom/accent/:id
// @access  Public
const getAccentById = asyncHandler(async (req, res) => {
  const accent = await Accent.findById(req.params.id)

  if (accent) {
    res.json(accent)
  } else {
    res.status(404)
    throw new Error('Accent not found')
  }
})

// @desc    Create new accent
// @route   POST /api/custom/accent
// @access  Private/Admin
const createAccent = asyncHandler(async (req, res) => {
  const { productType, accentName, accentImage, accentPrice } = req.body

  const accent = new Accent({
    productType: productType,
    accentName: accentName,
    accentImage: accentImage,
    accentPrice: accentPrice,
    user: req.user._id,
  })

  const createdAccent = await accent.save()
  res.status(201).json(createdAccent)
})

// @desc    Update an accent
// @route   PUT /api/custom/accent/:id
// @access  Private/Admin
const updateAccent = asyncHandler(async (req, res) => {
  const { productType, accentName, accentImage, accentPrice } = req.body

  const accent = await Accent.findById(req.params.id)

  if (accent) {
    accent.productType = productType
    accent.accentName = accentName
    accent.accentImage = accentImage
    accent.accentPrice = accentPrice

    const updatedAccent = accent.save()

    res.json(updatedAccent)
  } else {
    res.status(404)
    throw new Error('Accent not found')
  }
})

// @desc    Delete an accent
// @route   DELETE /api/custom/accent/:id
// @access  Private/Admin
const deleteAccent = asyncHandler(async (req, res) => {
  const accent = await Accent.findById(req.params.id)

  if (accent) {
    await accent.remove()
    res.json({ message: 'Accent removed' })
  } else {
    res.status(404)
    throw new Error('Accent not found')
  }
})

export { getAccents, getAccentById, createAccent, updateAccent, deleteAccent }
