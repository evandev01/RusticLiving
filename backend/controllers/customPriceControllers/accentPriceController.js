import asyncHandler from 'express-async-handler'
import AccentPrice from '../../models/customPriceModels/accentPriceModel.js'

// @desc    Fetch all accent prices
// @route   GET /api/customprices/accent
// @access  Public
const getAccentPrices = asyncHandler(async (req, res) => {
  const accentPrices = await AccentPrice.find({})

  if (accentPrices) {
    res.json(accentPrices)
  } else {
    res.status(404)
    throw new Error('Accent prices not found')
  }
})

// @desc    Fetch single accent by ID
// @route   GET /api/customprices/accent/:id
// @access  Public
const getAccentPriceById = asyncHandler(async (req, res) => {
  const accentPrice = await AccentPrice.findById(req.params.id)

  if (accentPrice) {
    res.json(accentPrice)
  } else {
    res.status(404)
    throw new Error('Accent price not found')
  }
})

// @desc    Create new accent price
// @route   POST /api/customprices/accent
// @access  Private/Admin
const createAccentPrice = asyncHandler(async (req, res) => {
  const { productType, pricePerUnit } = req.body

  const accentPrice = new AccentPrice({
    productType: productType,
    pricePerUnit: pricePerUnit,
    user: req.user._id,
  })

  const createdAccentPrice = await accentPrice.save()
  res.status(201).json(createdAccentPrice)
})

// @desc    Update an accent price
// @route   PUT /api/customprices/accent/:id
// @access  Private/Admin
const updateAccentPrice = asyncHandler(async (req, res) => {
  const { productType, pricePerUnit } = req.body

  const accentPrice = await AccentPrice.findById(req.params.id)

  if (accentPrice) {
    accentPrice.productType = productType
    accentPrice.pricePerUnit = pricePerUnit

    const updatedAccentPrice = accentPrice.save()

    res.json(updatedAccentPrice)
  } else {
    res.status(404)
    throw new Error('Accent price not found')
  }
})

// @desc    Delete an accent price
// @route   DELETE /api/customprices/accent/:id
// @access  Private/Admin
const deleteAccentPrice = asyncHandler(async (req, res) => {
  const accentPrice = await AccentPrice.findById(req.params.id)

  if (accentPrice) {
    await accentPrice.remove()
    res.json({ message: 'Accent price removed' })
  } else {
    res.status(404)
    throw new Error('Accent price not found')
  }
})

export {
  getAccentPrices,
  getAccentPriceById,
  createAccentPrice,
  updateAccentPrice,
  deleteAccentPrice,
}
