import asyncHandler from 'express-async-handler'
import SpeciesPrice from '../../models/customPriceModels/speciesPriceModel.js'

// @desc    Fetch all species prices
// @route   GET /api/customprices/species
// @access  Public
const getSpeciesPrices = asyncHandler(async (req, res) => {
  const speciesPrices = await SpeciesPrice.find({})

  if (speciesPrices) {
    res.json(speciesPrices)
  } else {
    res.status(404)
    throw new Error('species prices not found')
  }
})

// @desc    Fetch single species price
// @route   GET /api/customprices/species/:id
// @access  Public
const getSpeciesPriceById = asyncHandler(async (req, res) => {
  const speciesPrice = await SpeciesPrice.findById(req.params.id)

  if (speciesPrice) {
    res.json(speciesPrice)
  } else {
    res.status(404)
    throw new Error('species price not found')
  }
})

// @desc    Create species price
// @route   POST /api/customprices/species
// @access  Private/Admin
const createSpeciesPrice = asyncHandler(async (req, res) => {
  const { speciesName, productType, pricePerSqFt } = req.body

  const speciesPrice = new SpeciesPrice({
    speciesName: speciesName,
    productType: productType,
    pricePerSqFt: pricePerSqFt,
    user: req.user._id,
  })

  const createdSpeciesPrice = await speciesPrice.save()

  res.status(201).json(createdSpeciesPrice)
})

// @desc    Update species price
// @route   PUT /api/customprices/species/:id
// @access  Private/Admin
const updateSpeciesPrice = asyncHandler(async (req, res) => {
  const { speciesName, productType, pricePerSqFt } = req.body

  const speciesPrice = await SpeciesPrice.findById(req.params.id)

  if (speciesPrice) {
    speciesPrice.speciesName = speciesName
    speciesPrice.productType = productType
    speciesPrice.pricePerSqFt = pricePerSqFt

    const updatedSpeciesPrice = speciesPrice.save()

    res.json(updatedSpeciesPrice)
  } else {
    res.status(404)
    throw new Error('species price not found')
  }
})

// @desc    Delete species price
// @route   DELETE /api/customprices/species/:id
// @access  Private/Admin
const deleteSpeciesPrice = asyncHandler(async (req, res) => {
  const speciesPrice = await SpeciesPrice.findById(req.params.id)

  if (speciesPrice) {
    await speciesPrice.remove()
    res.json({ message: 'species price removed' })
  } else {
    res.status(404)
    throw new Error('species price not found')
  }
})

export {
  getSpeciesPrices,
  getSpeciesPriceById,
  createSpeciesPrice,
  updateSpeciesPrice,
  deleteSpeciesPrice,
}
