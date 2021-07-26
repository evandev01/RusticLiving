import asyncHandler from 'express-async-handler'
import Stain from '../../models/customProductModels/stainModel.js'

// @desc    Fetch all stains
// @route   GET /api/custom/stain
// @access  Public
const getStains = asyncHandler(async (req, res) => {
  const stains = await Stain.find({})

  if (stains) {
    res.json(stains)
  } else {
    res.status(404)
    throw new Error('stain  not found')
  }
})

// @desc    Fetch single stain by ID
// @route   GET /api/custom/stain/:id
// @access  Public
const getStainById = asyncHandler(async (req, res) => {
  const stain = await Stain.findById(req.params.id)

  if (stain) {
    res.json(stain)
  } else {
    res.status(404)
    throw new Error('stain  not found')
  }
})

// @desc    Create new stain
// @route   POST /api/custom/stain
// @access  Private/Admin
const createStain = asyncHandler(async (req, res) => {
  const { productType, stainName, stainImage, stainPrice } = req.body

  const stain = new Stain({
    productType: productType,
    stainName: stainName,
    stainImage: stainImage,
    stainPrice: stainPrice,
    user: req.user._id,
  })

  const createdStain = await stain.save()
  res.status(201).json(createdStain)
})

// @desc    Update a stain
// @route   PUT /api/custom/stain/:id
// @access  Private/Admin
const updateStain = asyncHandler(async (req, res) => {
  const { productType, stainName, stainImage, stainPrice } = req.body

  const stain = await Stain.findById(req.params.id)

  if (stain) {
    stain.productType = productType
    stain.stainName = stainName
    stain.stainImage = stainImage
    stain.stainPrice = stainPrice

    const updatedStain = stain.save()

    res.json(updatedStain)
  } else {
    res.status(404)
    throw new Error('stain  not found')
  }
})

// @desc    Delete an stain
// @route   DELETE /api/custom/stain/:id
// @access  Private/Admin
const deleteStain = asyncHandler(async (req, res) => {
  const stain = await Stain.findById(req.params.id)

  if (stain) {
    await stain.remove()
    res.json({ message: 'stain  removed' })
  } else {
    res.status(404)
    throw new Error('stain  not found')
  }
})

export { getStains, getStainById, createStain, updateStain, deleteStain }
