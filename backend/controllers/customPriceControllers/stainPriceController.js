import asyncHandler from 'express-async-handler'
import StainPrice from '../../models/customPriceModels/stainPriceModel.js'

// @desc    Fetch all stain prices
// @route   GET /api/customprices/stain
// @access  Public
const getStainPrices = asyncHandler(async (req, res) => {
  const stainPrices = await StainPrice.find({})

  if (stainPrices) {
    res.json(stainPrices)
  } else {
    res.status(404)
    throw new Error('stain prices not found')
  }
})

// @desc    Fetch single stain by ID
// @route   GET /api/customprices/stain/:id
// @access  Public
const getStainPriceById = asyncHandler(async (req, res) => {
  const stainPrice = await StainPrice.findById(req.params.id)

  if (stainPrice) {
    res.json(stainPrice)
  } else {
    res.status(404)
    throw new Error('stain price not found')
  }
})

// @desc    Create new stain price
// @route   POST /api/customprices/stain
// @access  Private/Admin
const createStainPrice = asyncHandler(async (req, res) => {
  const { productType, pricePerSqFt } = req.body

  const stainPrice = new StainPrice({
    productType: productType,
    pricePerSqFt: pricePerSqFt,
    user: req.user._id,
  })

  const createdStainPrice = await stainPrice.save()
  res.status(201).json(createdStainPrice)
})

// @desc    Update a stain price
// @route   PUT /api/customprices/stain/:id
// @access  Private/Admin
const updateStainPrice = asyncHandler(async (req, res) => {
  const { productType, pricePerSqFt } = req.body

  const stainPrice = await StainPrice.findById(req.params.id)

  if (stainPrice) {
    stainPrice.productType = productType
    stainPrice.pricePerSqFt = pricePerSqFt

    const updatedStainPrice = stainPrice.save()

    res.json(updatedStainPrice)
  } else {
    res.status(404)
    throw new Error('stain price not found')
  }
})

// @desc    Delete an stain price
// @route   DELETE /api/customprices/stain/:id
// @access  Private/Admin
const deleteStainPrice = asyncHandler(async (req, res) => {
  const stainPrice = await StainPrice.findById(req.params.id)

  if (stainPrice) {
    await stainPrice.remove()
    res.json({ message: 'stain price removed' })
  } else {
    res.status(404)
    throw new Error('stain price not found')
  }
})

export {
  getStainPrices,
  getStainPriceById,
  createStainPrice,
  updateStainPrice,
  deleteStainPrice,
}
