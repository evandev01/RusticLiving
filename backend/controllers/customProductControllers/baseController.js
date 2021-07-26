import asyncHandler from 'express-async-handler'
import Base from '../../models/customProductModels/baseModel.js'

// @desc    Fetch all  bases
// @route   GET /api/custom/base
// @access  Public
const getBases = asyncHandler(async (req, res) => {
  const bases = await Base.find({})

  if (bases) {
    res.json(bases)
  } else {
    res.status(404)
    throw new Error('No  bases found')
  }
})

// @desc    Fetch single base
// @route   GET /api/custom/base/:id
// @access  Public
const getBaseById = asyncHandler(async (req, res) => {
  const base = await Base.findById(req.params.id)

  if (base) {
    res.json(base)
  } else {
    res.status(404)
    throw new Error('No  base found')
  }
})

// @desc    Create a new base
// @route   POST /api/custom/base
// @access  Private/Admin
const createBase = asyncHandler(async (req, res) => {
  const { productType, baseName, baseImage, basePrice } = req.body

  const base = new Base({
    productType: productType,
    baseName: baseName,
    baseImage: baseImage,
    basePrice: basePrice,
    user: req.user._id,
  })

  const createdCreatedCustomBase = await base.save()
  res.status(201).json(createdCreatedCustomBase)
})

// @desc    Update a base
// @route   PUT /api/custom/base/:id
// @access  Private/Admin

const updateBase = asyncHandler(async (req, res) => {
  const { productType, baseName, baseImage, basePrice } = req.body

  const base = await Base.findById(req.params.id)

  if (base) {
    base.productType = productType
    base.baseName = baseName
    base.baseImage = baseImage
    base.basePrice = basePrice

    const updatedCustomBase = await base.save()

    res.json(updatedCustomBase)
  } else {
    res.status(404)
    throw new Error('Custom base not found')
  }
})

// @desc    Delete a base
// @route   DELETE /api/custom/base/:id
// @access  Private/Admin
const deleteBase = asyncHandler(async (req, res) => {
  const base = await Base.findById(req.params.id)

  if (base) {
    await base.remove()
    res.json({ message: 'Custom base removed' })
  } else {
    res.status(404)
    throw new Error('Custom base not found')
  }
})

export { getBases, getBaseById, createBase, updateBase, deleteBase }
