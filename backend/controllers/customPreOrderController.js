import asyncHandler from 'express-async-handler'
import CustomPreOrder from '../models/customPreOrderModel.js'

// @desc    Fetch all custom pre-order orders
// @route   GET /api/customPreorders
// @access  Private
const getCustomPreOrders = asyncHandler(async (req, res) => {
  const customPreOrders = await CustomPreOrder.find({})

  if (customPreOrders) {
    res.json(customPreOrders)
  } else {
    res.status(404)
    throw new Error('No custom pre-order orders found')
  }
})

// @desc    Fetch a single custom pre-order order
// @route   GET /api/custompreorders/:id
// @access  Private
const getCustomPreOrderById = asyncHandler(async (req, res) => {
  const customPreOrder = await CustomPreOrder.findById(req.params.id)

  if (customPreOrder) {
    res.json(customPreOrder)
  } else {
    res.status(404)
    throw new Error('No custom pre-order found')
  }
})

// @desc    Create a new product order
// @route   POST /api/customPreorders
// @access  Private
const saveCustomPreOrder = asyncHandler(async (req, res) => {
  const {
    productType,
    qty,
    size,
    speciesName,
    speciesImage,
    speciesTotal,
    stainName,
    stainImage,
    stainTotal,
    paintName,
    paintImage,
    paintTotal,
    baseName,
    baseImage,
    baseTotal,
    subtotal,
    estCompDate,
  } = req.body

  const customPreOrder = new CustomPreOrder({
    productType: productType,
    qty: qty,
    size: size,
    speciesName: speciesName,
    speciesImage: speciesImage,
    speciesTotal: speciesTotal,
    stainName: stainName,
    stainImage: stainImage,
    stainTotal: stainTotal,
    paintName: paintName,
    paintImage: paintImage,
    paintTotal: paintTotal,
    baseName: baseName,
    baseImage: baseImage,
    baseTotal: baseTotal,
    subtotal: subtotal,
    estCompDate: estCompDate,
    user: req.user._id,
  })

  const createdCustomPreOrder = await customPreOrder.save()
  res.status(201).json(createdCustomPreOrder)
})

// @desc    Update a custom pre-order
// @route   PUT /api/custompreorders/:id
// @access  Private

const updateCustomPreOrder = asyncHandler(async (req, res) => {
  const {
    productType,
    qty,
    size,
    speciesName,
    speciesImage,
    speciesTotal,
    stainName,
    stainImage,
    stainTotal,
    paintName,
    paintImage,
    paintTotal,
    baseName,
    baseImage,
    baseTotal,
    subtotal,
    estCompDate,
  } = req.body

  const customPreOrder = await CustomPreOrder.findById(req.params.id)

  if (customPreOrder) {
    customPreOrder.productType = productType
    customPreOrder.qty = qty
    customPreOrder.size = size
    customPreOrder.speciesName = speciesName
    customPreOrder.speciesImage = speciesImage
    customPreOrder.speciesTotal = speciesTotal
    customPreOrder.stainName = stainName
    customPreOrder.stainImage = stainImage
    customPreOrder.stainTotal = stainTotal
    customPreOrder.paintName = paintName
    customPreOrder.paintImage = paintImage
    customPreOrder.paintTotal = paintTotal
    customPreOrder.baseName = baseName
    customPreOrder.baseImage = baseImage
    customPreOrder.baseTotal = baseTotal
    customPreOrder.subtotal = subtotal
    customPreOrder.estCompDate = estCompDate

    const updatedCustomPreOrder = await customPreOrder.save()

    res.json(updatedCustomPreOrder)
  } else {
    res.status(404)
    throw new Error('Custom pre-order not updated')
  }
})

// @desc    Delete a custom pre-order
// @route   DELETE /api/custompreorders/:id
// @access  Private
const deleteCustomPreOrder = asyncHandler(async (req, res) => {
  const customPreOrder = await CustomPreOrder.findById(req.params.id)

  if (customPreOrder) {
    await customPreOrder.remove()
    res.json({ message: 'Custom pre-order removed' })
  } else {
    res.status(404)
    throw new Error('Custom pre-order not found')
  }
})

export {
  getCustomPreOrders,
  getCustomPreOrderById,
  saveCustomPreOrder,
  updateCustomPreOrder,
  deleteCustomPreOrder,
}
