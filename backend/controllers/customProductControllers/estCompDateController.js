import asyncHandler from 'express-async-handler'
import EstCompDate from '../../models/customProductModels/estCompDateModel.js'

// Parameters:
// == Only one estimated completion date will be allowed for all custom products
// == Admin will only be able to update - not create or delete

// @desc    Fetch all estimated completion dates
// @route   /api/custom/estcompdate
// @access  Public
const getEstCompDate = asyncHandler(async (req, res) => {
  const estCompDate = EstCompDate.find({})

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

  const estimatedCompletionDate = new EstCompDate({
    estCompDate: estCompDate,
  })

  const createdEstCompDate = await estimatedCompletionDate.save()
  res.status(201).json(createdEstCompDate)
})

// @desc    Update estimated completion date
// @route   /api/custom/estcompdate/:id
// @access  Private/Admin
const updateEstCompDate = asyncHandler(async (req, res) => {
  const { estCompDate } = req.body

  const estimatedCompletionDate = EstCompDate.findById(req.params.id)

  if (estimatedCompletionDate) {
    estCompDate.estCompDate = estCompDate

    const updatedEstCompDate = estimatedCompletionDate.save()

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
  const estimatedCompletionDate = EstCompDate.findById(req.params.id)

  if (estimatedCompletionDate) {
    await estimatedCompletionDate.remove()

    res.json({ message: 'estimated completion date removed' })
  } else {
    res.status(404)
    throw new Error('estimated completion date not found')
  }
})

export {
  getEstCompDate,
  createEstCompDate,
  updateEstCompDate,
  deleteEstCompDate,
}
