import asyncHandler from 'express-async-handler'
import BedFramePrice from '../../models/customPriceModels/bedFramePriceModel.js'

// @desc    Fetch all bed frame prices
// @route   GET /api/customprices/bedframe
// @access  Public
const getBedFramePrices = asyncHandler(async (req, res) => {
  const bedFramePrices = await BedFramePrice.find({})

  if (bedFramePrices) {
    res.json(bedFramePrices)
  } else {
    res.status(404)
    throw new Error('Bed frame prices not found')
  }
})

// @desc    Fetch single bed frame price
// @route   GET /api/customprices/bedframe/:id
// @access  Public
const getBedFramePriceById = asyncHandler(async (req, res) => {
  const bedFramePrice = await BedFramePrice.findById(req.params.id)

  if (bedFramePrice) {
    res.json(bedFramePrice)
  } else {
    res.status(404)
    throw new Error('Bed frame price not found')
  }
})

// @desc    Create bed frame price
// @route   POST /api/customprices/bedframe
// @access  Private/Admin
const createBedFramePrice = asyncHandler(async (req, res) => {
  const { speciesName, pricePerSqFt } = req.body

  const bedFramePrice = new BedFramePrice({
    speciesName: speciesName,
    pricePerSqFt: pricePerSqFt,
    user: req.user._id,
  })

  const createdBedFramePrice = await bedFramePrice.save()

  res.status(201).json(createdBedFramePrice)
})

// @desc    Update bed frame price
// @route   PUT /api/customprices/bedframe/:id
// @access  Private/Admin
const updateBedFramePrice = asyncHandler(async (req, res) => {
  const { speciesName, pricePerSqFt } = req.body

  const bedFramePrice = await BedFramePrice.findById(req.params.id)

  if (bedFramePrice) {
    bedFramePrice.speciesName = speciesName
    bedFramePrice.pricePerSqFt = pricePerSqFt

    const updatedBedFramePrice = bedFramePrice.save()

    res.json(updatedBedFramePrice)
  } else {
    res.status(404)
    throw new Error('Bed frame price not found')
  }
})

// @desc    Delete bed frame price
// @route   DELETE /api/customprices/bedframe/:id
// @access  Private/Admin
const deleteBedFramePrice = asyncHandler(async (req, res) => {
  const bedFramePrice = await BedFramePrice.findById(req.params.id)

  if (bedFramePrice) {
    await bedFramePrice.remove()
    res.json({ message: 'Bed frame price removed' })
  } else {
    res.status(404)
    throw new Error('Bed frame price not found')
  }
})

export {
  getBedFramePrices,
  getBedFramePriceById,
  createBedFramePrice,
  updateBedFramePrice,
  deleteBedFramePrice,
}
