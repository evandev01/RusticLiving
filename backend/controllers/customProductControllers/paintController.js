import asyncHandler from 'express-async-handler'
import Paint from '../../models/customProductModels/paintModel.js'

// @desc    Fetch all paints
// @route   GET /api/custom/paint
// @access  Public
const getPaints = asyncHandler(async (req, res) => {
  const paints = await Paint.find({})

  if (paints) {
    res.json(paints)
  } else {
    res.status(404)
    throw new Error('paints not found')
  }
})

// @desc    Fetch single paint by ID
// @route   GET /api/custom/paint/:id
// @access  Public
const getPaintById = asyncHandler(async (req, res) => {
  const paint = await Paint.findById(req.params.id)

  if (paint) {
    res.json(paint)
  } else {
    res.status(404)
    throw new Error('paint  not found')
  }
})

// @desc    Create new paint
// @route   POST /api/custom/paint
// @access  Private/Admin
const createPaint = asyncHandler(async (req, res) => {
  const { productType, paintName, paintImage, paintPrice } = req.body

  const paint = new Paint({
    productType: productType,
    paintName: paintName,
    paintImage: paintImage,
    paintPrice: paintPrice,
    user: req.user._id,
  })

  const createdPaint = await paint.save()
  res.status(201).json(createdPaint)
})

// @desc    Update a paint
// @route   PUT /api/custom/paint/:id
// @access  Private/Admin
const updatePaint = asyncHandler(async (req, res) => {
  const { productType, paintName, paintImage, paintPrice } = req.body

  const paint = await Paint.findById(req.params.id)

  if (paint) {
    paint.productType = productType
    paint.paintName = paintName
    paint.paintImage = paintImage
    paint.paintPrice = paintPrice

    const updatedPaint = paint.save()

    res.json(updatedPaint)
  } else {
    res.status(404)
    throw new Error('paint  not found')
  }
})

// @desc    Delete an paint
// @route   DELETE /api/custom/paint/:id
// @access  Private/Admin
const deletePaint = asyncHandler(async (req, res) => {
  const paint = await Paint.findById(req.params.id)

  if (paint) {
    await paint.remove()
    res.json({ message: 'paint  removed' })
  } else {
    res.status(404)
    throw new Error('paint  not found')
  }
})

export { getPaints, getPaintById, createPaint, updatePaint, deletePaint }
