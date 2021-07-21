import asyncHandler from 'express-async-handler'
import TablePrice from '../../models/customPriceModels/tablePriceModel.js'

// @desc    Fetch all table prices
// @route   GET /api/customprices/table
// @access  Public
const getTablePrices = asyncHandler(async (req, res) => {
  const tablePrices = await TablePrice.find({})

  if (tablePrices) {
    res.json(tablePrices)
  } else {
    res.status(404)
    throw new Error('table prices not found')
  }
})

// @desc    Fetch single table price
// @route   GET /api/customprices/table/:id
// @access  Public
const getTablePriceById = asyncHandler(async (req, res) => {
  const tablePrice = await TablePrice.findById(req.params.id)

  if (tablePrice) {
    res.json(tablePrice)
  } else {
    res.status(404)
    throw new Error('table price not found')
  }
})

// @desc    Create table price
// @route   POST /api/customprices/table
// @access  Private/Admin
const createTablePrice = asyncHandler(async (req, res) => {
  const { speciesName, pricePerSqFt } = req.body

  const tablePrice = new TablePrice({
    speciesName: speciesName,
    pricePerSqFt: pricePerSqFt,
    user: req.user._id,
  })

  const createdTablePrice = await tablePrice.save()

  res.status(201).json(createdTablePrice)
})

// @desc    Update table price
// @route   PUT /api/customprices/table/:id
// @access  Private/Admin
const updateTablePrice = asyncHandler(async (req, res) => {
  const { speciesName, pricePerSqFt } = req.body

  const tablePrice = await TablePrice.findById(req.params.id)

  if (tablePrice) {
    tablePrice.speciesName = speciesName
    tablePrice.pricePerSqFt = pricePerSqFt

    const updatedTablePrice = tablePrice.save()

    res.json(updatedTablePrice)
  } else {
    res.status(404)
    throw new Error('table price not found')
  }
})

// @desc    Delete table price
// @route   DELETE /api/customprices/table/:id
// @access  Private/Admin
const deleteTablePrice = asyncHandler(async (req, res) => {
  const tablePrice = await TablePrice.findById(req.params.id)

  if (tablePrice) {
    await tablePrice.remove()
    res.json({ message: 'table price removed' })
  } else {
    res.status(404)
    throw new Error('table price not found')
  }
})

export {
  getTablePrices,
  getTablePriceById,
  createTablePrice,
  updateTablePrice,
  deleteTablePrice,
}
