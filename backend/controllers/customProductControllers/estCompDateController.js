import asyncHandler from 'express-async-handler'
import EstCompDate from '../../models/customProductModels/estCompDateModel.js'

// Parameters:
// == Only one estimated completion date will be allowed for all custom products
// == Admin will only be able to update - not create or delete

// @desc    Fetch all estimated completion dates
// @route   /api/custom/estcompdate
// @access  Public
const getEstCompDates = asyncHandler(async (req, res) => {
  const estCompDates = await EstCompDate.find({})

  if (estCompDates) {
    res.json(estCompDates)
  } else {
    res.status(404)
    throw new Error('estimated completion date not found')
  }
})

// @desc    Fetch single estimated completion date
// @route   /api/custom/estcompdate
// @access  Public
const getEstCompDateById = asyncHandler(async (req, res) => {
  const estCompDate = await EstCompDate.findById(req.params.id)

  if (estCompDate) {
    res.json(estCompDate)
  } else {
    res.status(404)
    throw new Error('estimated completion date not found')
  }
})

// @desc    Create estimated completion date
// @route   /api/custom/estcompdate
// @access  None
const createEstCompDate = asyncHandler(async (req, res) => {
  const { estCompDate } = req.body

  const estCompletionDate = new EstCompDate({
    estCompDate: estCompDate,
    user: req.user._id,
  })

  const createdEstCompDate = await estCompletionDate.save()
  res.status(201).json(createdEstCompDate)
})

// @desc    Update estimated completion date
// @route   /api/custom/estcompdate/:id
// @access  Private/Admin
const updateEstCompDate = asyncHandler(async (req, res) => {
  const { estCompDate } = req.body

  const estCompletionDate = await EstCompDate.findById(req.params.id)

  if (estCompletionDate) {
    estCompletionDate.estCompDate = estCompDate

    const updatedEstCompDate = await estCompletionDate.save()

    res.json(updatedEstCompDate)
  } else {
    res.status(404)
    throw new Error('estimated completion date not found')
  }
})

// @desc    Delete estimated completion date
// @route   /api/custom/estcompdate/:id
// @access  None
const deleteEstCompDate = asyncHandler(async (req, res) => {
  const estCompDate = await EstCompDate.findById(req.params.id)

  if (estCompDate) {
    await estCompDate.remove()

    res.json({ message: 'estimated completion date removed' })
  } else {
    res.status(404)
    throw new Error('estimated completion date not found')
  }
})

export {
  getEstCompDates,
  getEstCompDateById,
  createEstCompDate,
  updateEstCompDate,
  deleteEstCompDate,
}
