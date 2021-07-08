import asyncHandler from 'express-async-handler'
import CustomPaint from '../models/customProductModels/customPaintModel.js'

// @desc    Fetch all custom paints
// @route   GET /api/custompaints
// @access  Public
const getCustomPaints = asyncHandler(async (req, res) => {
  const customPaints = await CustomPaint.find({})

  if (customPaints) {
    res.json(customPaints)
  } else {
    res.status(404)
    throw new Error('Custom paints not found')
  }
})

// @desc    Fetch single custom paint
// @route   GET /api/custompaints/:id
// @access  Public
const getCustomPaintById = asyncHandler(async (req, res) => {
  const customPaint = await CustomPaint.findById(req.params.id)

  if (customPaint) {
    res.json(customPaint)
  } else {
    res.status(404)
    throw new Error('Custom paint not found')
  }
})

// @desc    Create a new custom paint
// @route   POST /api/custompaints
// @access  Private/Admin
const createCustomPaint = asyncHandler(async (req, res) => {
  const { paintName, paintImage } = req.body

  const customPaint = new CustomPaint({
    paintName: paintName,
    paintImage: paintImage,
    user: req.user._id,
  })

  const createdCreatedCustomPaint = await customPaint.save()
  res.status(201).json(createdCreatedCustomPaint)
})

// @desc    Update a custom paint
// @route   PUT /api/custompaints/:id
// @access  Private/Admin

const updateCustomPaint = asyncHandler(async (req, res) => {
  const { paintName, paintImage } = req.body

  const customPaint = await CustomPaint.findById(req.params.id)

  if (customPaint) {
    customPaint.paintName = paintName
    customPaint.paintImage = paintImage

    const updatedCustomPaint = await customPaint.save()

    res.json(updatedCustomPaint)
  } else {
    res.status(404)
    throw new Error('Custom paint not found')
  }
})

// @desc    Delete a custom paint
// @route   DELETE /api/custompaints/:id
// @access  Private/Admin
const deleteCustomPaint = asyncHandler(async (req, res) => {
  const customPaint = await CustomPaint.findById(req.params.id)

  if (customPaint) {
    await customPaint.remove()
    res.json({ message: 'Custom paint removed' })
  } else {
    res.status(404)
    throw new Error('Custom paint not found')
  }
})

export {
  getCustomPaints,
  getCustomPaintById,
  createCustomPaint,
  updateCustomPaint,
  deleteCustomPaint,
}
