import asyncHandler from 'express-async-handler'
import Table from '../../models/customProductModels/tableModel.js'

// @desc    Fetch all tables
// @route   GET /api/custom/table
// @access  Public
const getTables = asyncHandler(async (req, res) => {
  const tables = await Table.find({})

  if (tables) {
    res.json(tables)
  } else {
    res.status(404)
    throw new Error('Table not found')
  }
})

// @desc    Fetch single table
// @route   GET /api/custom/table/:id
// @access  Public
const getTableById = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id)

  if (table) {
    res.json(table)
  } else {
    res.status(404)
    throw new Error('Table not found')
  }
})

// @desc    Create table
// @route   POST /api/custom/table
// @access  Private/Admin
const createTable = asyncHandler(async (req, res) => {
  const { speciesName, speciesImage, speciesPrice } = req.body

  const table = new Table({
    speciesName: speciesName,
    speciesImage: speciesImage,
    speciesPrice: speciesPrice,
    user: req.user._id,
  })

  const createdTable = await table.save()

  res.status(201).json(createdTable)
})

// @desc    Update table
// @route   PUT /api/custom/table/:id
// @access  Private/Admin
const updateTable = asyncHandler(async (req, res) => {
  const { speciesName, speciesImage, speciesPrice } = req.body

  const table = await Table.findById(req.params.id)

  if (table) {
    table.speciesName = speciesName
    table.speciesImage = speciesImage
    table.speciesPrice = speciesPrice

    const updatedTable = table.save()

    res.json(updatedTable)
  } else {
    res.status(404)
    throw new Error('Table not found')
  }
})

// @desc    Delete table
// @route   DELETE /api/custom/table/:id
// @access  Private/Admin
const deleteTable = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id)

  if (table) {
    await table.remove()
    res.json({ message: 'Table removed' })
  } else {
    res.status(404)
    throw new Error('Table not found')
  }
})

export { getTables, getTableById, createTable, updateTable, deleteTable }
