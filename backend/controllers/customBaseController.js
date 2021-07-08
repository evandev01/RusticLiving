import asyncHandler from 'express-async-handler'
import CustomBase from '../models/customProductModels/customBaseModel.js'

// @desc    Fetch all custom bases
// @route   GET /api/custombases
// @access  Public
const getCustomBases = asyncHandler(async (req, res) => {
  const customBases = await CustomBase.find({})

  if (customBases) {
    res.json(customBases)
  } else {
    res.status(404)
    throw new Error('No custom bases found')
  }
})

// @desc    Fetch single custom base
// @route   GET /api/custombases/:id
// @access  Public
const getCustomBaseById = asyncHandler(async (req, res) => {
  const customBase = await CustomBase.findById(req.params.id)

  if (customBase) {
    res.json(customBase)
  } else {
    res.status(404)
    throw new Error('No custom base found')
  }
})

// @desc    Create a new custom base
// @route   POST /api/custombases
// @access  Private/Admin
const createCustomBase = asyncHandler(async (req, res) => {
  const { baseName, baseImage } = req.body

  const customBase = new CustomBase({
    baseName: baseName,
    baseImage: baseImage,
    user: req.user._id,
  })

  const createdCreatedCustomBase = await customBase.save()
  res.status(201).json(createdCreatedCustomBase)
})

// @desc    Update a custom base
// @route   PUT /api/custombases/:id
// @access  Private/Admin

const updateCustomBase = asyncHandler(async (req, res) => {
  const { baseName, baseImage } = req.body

  const customBase = await CustomBase.findById(req.params.id)

  if (customBase) {
    customBase.baseName = baseName
    customBase.baseImage = baseImage

    const updatedCustomBase = await customBase.save()

    res.json(updatedCustomBase)
  } else {
    res.status(404)
    throw new Error('Custom base not found')
  }
})

// @desc    Delete a custom base
// @route   DELETE /api/custombases/:id
// @access  Private/Admin
const deleteCustomBase = asyncHandler(async (req, res) => {
  const customBase = await CustomBase.findById(req.params.id)

  if (customBase) {
    await customBase.remove()
    res.json({ message: 'Custom base removed' })
  } else {
    res.status(404)
    throw new Error('Custom base not found')
  }
})

export {
  getCustomBases,
  getCustomBaseById,
  createCustomBase,
  updateCustomBase,
  deleteCustomBase,
}
