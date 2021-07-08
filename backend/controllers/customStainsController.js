import asyncHandler from 'express-async-handler'
import CustomStain from '../models/customProductModels/customStainModel.js'

// @desc    Fetch all custom stains
// @route   GET /api/customstains
// @access  Public
const getCustomStains = asyncHandler(async (req, res) => {
  const customStains = await CustomStains.find({})

  if (customStains) {
    res.json(customStains)
  } else {
    res.status(404)
    throw new Error('Custom stains not found')
  }
})

// @desc    Fetch single custom stain
// @route   GET /api/customstains/:id
// @access  Public
const getCustomStainById = asyncHandler(async (req, res) => {
  const customStains = await CustomStains.findById(req.params.id)

  if (customStains) {
    res.json(customStains)
  } else {
    res.status(404)
    throw new Error('Custom stain not found')
  }
})

// @desc    Create a new custom stain
// @route   POST /api/customstains
// @access  Private/Admin
const createCustomStain = asyncHandler(async (req, res) => {
  const { stainName, stainImage } = req.body

  const customStain = new CustomSpecies({
    stainName: stainName,
    stainImage: stainImage,
    user: req.user._id,
  })

  const createdCreatedCustomStain = await customStain.save()
  res.status(201).json(createdCreatedCustomStain)
})

// @desc    Update a custom stain
// @route   PUT /api/customstains/:id
// @access  Private/Admin

const updateCustomStain = asyncHandler(async (req, res) => {
  const { stainName, stainImage } = req.body

  const customStain = await CustomStain.findById(req.params.id)

  if (customStain) {
    customStain.stainName = stainName
    customStain.stainImage = stainImage

    const updatedCustomStain = await customStain.save()

    res.json(updatedCustomStain)
  } else {
    res.status(404)
    throw new Error('Custom stain not found')
  }
})

// @desc    Delete a custom stain
// @route   DELETE /api/customstains/:id
// @access  Private/Admin
const deleteCustomStain = asyncHandler(async (req, res) => {
  const customStain = await CustomStain.findById(req.params.id)

  if (customStain) {
    await customStain.remove()
    res.json({ message: 'Custom stain removed' })
  } else {
    res.status(404)
    throw new Error('Custom stain not found')
  }
})

export {
  getCustomStains,
  getCustomStainById,
  createCustomStain,
  updateCustomStain,
  deleteCustomStain,
}
