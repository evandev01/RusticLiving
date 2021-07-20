import asyncHandler from 'express-async-handler'
import PaintPrice from '../../models/customPriceModels/paintPriceModel.js'

// @desc    Fetch all paint prices
// @route   GET /api/customprices/paint
// @access  Public
const getPaintPrices = asyncHandler(async (req, res) => {
  const paintPrices = await PaintPrice.find({})

  if (paintPrices) {
    res.json(paintPrices)
  } else {
    res.status(404)
    throw new Error('paint prices not found')
  }
})

// @desc    Fetch single paint by ID
// @route   GET /api/customprices/paint/:id
// @access  Public
const getPaintPriceById = asyncHandler(async (req, res) => {
  const paintPrice = await PaintPrice.findById(req.params.id)

  if (paintPrice) {
    res.json(paintPrice)
  } else {
    res.status(404)
    throw new Error('paint price not found')
  }
})

// @desc    Create new paint price
// @route   POST /api/customprices/paint
// @access  Private/Admin
const createPaintPrice = asyncHandler(async (req, res) => {
  const { productType, pricePerSqFt } = req.body

  const paintPrice = new PaintPrice({
    productType: productType,
    pricePerSqFt: pricePerSqFt,
    user: req.user._id,
  })

  const createdPaintPrice = await paintPrice.save()
  res.status(201).json(createdPaintPrice)
})

// @desc    Update a paint price
// @route   PUT /api/customprices/paint/:id
// @access  Private/Admin
const updatePaintPrice = asyncHandler(async (req, res) => {
  const { productType, pricePerSqFt } = req.body

  const paintPrice = await PaintPrice.findById(req.params.id)

  if (paintPrice) {
    paintPrice.productType = productType
    paintPrice.pricePerSqFt = pricePerSqFt

    const updatedPaintPrice = paintPrice.save()

    res.json(updatedPaintPrice)
  } else {
    res.status(404)
    throw new Error('paint price not found')
  }
})

// @desc    Delete an paint price
// @route   DELETE /api/customprices/paint/:id
// @access  Private/Admin
const deletePaintPrice = asyncHandler(async (req, res) => {
  const paintPrice = await PaintPrice.findById(req.params.id)

  if (paintPrice) {
    await paintPrice.remove()
    res.json({ message: 'paint price removed' })
  } else {
    res.status(404)
    throw new Error('paint price not found')
  }
})

export {
  getPaintPrices,
  getPaintPriceById,
  createPaintPrice,
  updatePaintPrice,
  deletePaintPrice,
}
