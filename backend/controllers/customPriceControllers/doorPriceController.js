import asyncHandler from 'express-async-handler'
import DoorPrice from '../../models/customPriceModels/doorPriceModel.js'

// @desc    Fetch all door prices
// @route   GET /api/customprices/door
// @access  Public
const getDoorPrices = asyncHandler(async (req, res) => {
  const doorPrices = await DoorPrice.find({})

  if (doorPrices) {
    res.json(doorPrices)
  } else {
    res.status(404)
    throw new Error('Door prices not found')
  }
})

// @desc    Fetch single door price
// @route   GET /api/customprices/door/:id
// @access  Public
const getDoorPriceById = asyncHandler(async (req, res) => {
  const doorPrice = await DoorPrice.findById(req.params.id)

  if (doorPrice) {
    res.json(doorPrice)
  } else {
    res.status(404)
    throw new Error('Door price not found')
  }
})

// @desc    Create door price
// @route   POST /api/customprices/door
// @access  Private/Admin
const createDoorPrice = asyncHandler(async (req, res) => {
  const { speciesName, pricePerSqFt } = req.body

  const doorPrice = new DoorPrice({
    speciesName: speciesName,
    pricePerSqFt: pricePerSqFt,
    user: req.user._id,
  })

  const createdDoorPrice = await doorPrice.save()

  res.status(201).json(createdDoorPrice)
})

// @desc    Update door price
// @route   PUT /api/customprices/door/:id
// @access  Private/Admin
const updateDoorPrice = asyncHandler(async (req, res) => {
  const { speciesName, pricePerSqFt } = req.body

  const doorPrice = await DoorPrice.findById(req.params.id)

  if (doorPrice) {
    doorPrice.speciesName = speciesName
    doorPrice.pricePerSqFt = pricePerSqFt

    const updatedDoorPrice = doorPrice.save()

    res.json(updatedDoorPrice)
  } else {
    res.status(404)
    throw new Error('Door price not found')
  }
})

// @desc    Delete door price
// @route   DELETE /api/customprices/door/:id
// @access  Private/Admin
const deleteDoorPrice = asyncHandler(async (req, res) => {
  const doorPrice = await DoorPrice.findById(req.params.id)

  if (doorPrice) {
    await doorPrice.remove()
    res.json({ message: 'Door price removed' })
  } else {
    res.status(404)
    throw new Error('Door price not found')
  }
})

export {
  getDoorPrices,
  getDoorPriceById,
  createDoorPrice,
  updateDoorPrice,
  deleteDoorPrice,
}
