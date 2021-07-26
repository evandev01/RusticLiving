import asyncHandler from 'express-async-handler'
import CustomPreOrder from '../models/customPreOrderModel.js'

// @desc    Fetch all custom product order orders
// @route   GET /api/customPreorders
// @access  Private
const getCustomPreOrders = asyncHandler(async (req, res) => {
  const customPreOrders = await CustomPreOrder.find({})

  if (customPreOrders) {
    res.json(customPreOrders)
  } else {
    res.status(404)
    throw new Error('No custom product order orders found')
  }
})

// @desc    Fetch a single custom product order order
// @route   GET /api/custompreorders/:id
// @access  Private
const getCustomPreOrderById = asyncHandler(async (req, res) => {
  const customPreOrder = await CustomPreOrder.findById(req.params.id)

  if (customPreOrder) {
    res.json(customPreOrder)
  } else {
    res.status(404)
    throw new Error('No custom product order found')
  }
})

// @desc    Create a new product order
// @route   POST /api/customPreorders
// @access  Private
const createCustomPreOrder = asyncHandler(async (req, res) => {
  const {
    productType,
    qty,
    size,
    speciesType,
    speciesPrice,
    stainType,
    stainPrice,
    paintType,
    paintPrice,
    subtotalPrice,
    estCompletionDate,
  } = req.body

  const customPreOrder = new CustomPreOrder({
    user: req.user._id,
    productType: productType,
    qty: qty,
    size: size,
    speciesType: speciesType,
    speciesPrice: speciesPrice,
    stainType: stainType,
    stainPrice: stainPrice,
    paintType: paintType,
    paintPrice: paintPrice,
    subtotalPrice: subtotalPrice,
    estCompletionDate: estCompletionDate,
  })

  const createdCustomPreOrder = await customPreOrder.save()
  res.status(201).json(createdCustomPreOrder)
})

// @desc    Update a custom product order
// @route   PUT /api/custompreorders/:id
// @access  Private

const updateCustomPreOrder = asyncHandler(async (req, res) => {
  const {
    productType,
    qty,
    size,
    speciesType,
    speciesPrice,
    stainType,
    stainPrice,
    paintType,
    paintPrice,
    subtotalPrice,
    estCompletionDate,
  } = req.body

  const customPreOrder = await CustomPreOrder.findById(req.params.id)

  if (customPreOrder) {
    customPreOrder.productType = productType
    customPreOrder.qty = qty
    customPreOrder.size = size
    customPreOrder.speciesType = speciesType
    customPreOrder.speciesPrice = speciesPrice
    customPreOrder.stainType = stainType
    customPreOrder.stainPrice = stainPrice
    customPreOrder.paintType = paintType
    customPreOrder.paintPrice = paintPrice
    customPreOrder.subtotalPrice = subtotalPrice
    customPreOrder.estCompletionDate = estCompletionDate

    const updatedCustomPre = await customPreOrder.save()

    res.json(updatedCustomPre)
  } else {
    res.status(404)
    throw new Error('Custom product order not updated')
  }
})

// @desc    Delete a custom product order
// @route   DELETE /api/custompreorders/:id
// @access  Private
const deleteCustomPreOrder = asyncHandler(async (req, res) => {
  const customPreOrder = await CustomPreOrder.findById(req.params.id)

  if (customPreOrder) {
    await customPreOrder.remove()
    res.json({ message: 'Custom product order removed' })
  } else {
    res.status(404)
    throw new Error('Custom product order not found')
  }
})

export {
  getCustomPreOrders,
  getCustomPreOrderById,
  createCustomPreOrder,
  updateCustomPreOrder,
  deleteCustomPreOrder,
}
