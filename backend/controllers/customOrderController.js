import asyncHandler from 'express-async-handler'
import CustomOrder from '../models/customOrderModel.js'

// @desc    Create new custom order
// @route   POST /api/customorders
// @access  Private
const addCustomOrderItems = asyncHandler(async (req, res) => {
  const {
    customOrderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (customOrderItems && customOrderItems.length === 0) {
    // Bad request status
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const customOrder = new CustomOrder({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdCustomOrder = await customOrder.save()

    // Something was created status
    res.status(201).json(createdCustomOrder)
  }
})

// @desc    Get custom order by ID
// @route   GET /api/customorders/:id
// @access  Private
const getCustomOrderById = asyncHandler(async (req, res) => {
  const customOrder = await CustomOrder.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (customOrder) {
    res.json(customOrder)
  } else {
    res.status(404)
    throw new Error('Custom order not found')
  }
})

// @desc    Update custom order to paid
// @route   PUT /api/customorders/:id/pay
// @access  Private
const updateCustomOrderToPaid = asyncHandler(async (req, res) => {
  const customOrder = await CustomOrder.findById(req.params.id)

  if (customOrder) {
    customOrder.isPaid = true
    customOrder.paidAt = Date.now()
    customOrder.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedCustomOrder = await customOrder.save()

    res.json(updatedCustomOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user custom orders
// @route   GET /api/customorders/mycustomorders
// @access  Private
const getMyCustomOrders = asyncHandler(async (req, res) => {
  const customOrders = await CustomOrder.find({ user: req.user._id })
  res.json(customOrders)
})

// @desc    Get all custom orders
// @route   GET /api/customorders
// @access  Private/Admin
const getCustomOrders = asyncHandler(async (req, res) => {
  const customOrders = await CustomOrder.find({}).populate('user', 'id name')
  res.json(customOrders)
})

// @desc    Update custom order to delivered
// @route   GET /api/customorders/:id/deliver
// @access  Private/Admin
const updateCustomOrderToDelivered = asyncHandler(async (req, res) => {
  const customOrder = await CustomOrder.findById(req.params.id)

  if (customOrder) {
    customOrder.isDelivered = true
    customOrder.deliveredAt = Date.now()

    const updatedCustomOrder = await customOrder.save()

    res.json(updatedCustomOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  addCustomOrderItems,
  getCustomOrderById,
  updateCustomOrderToPaid,
  updateCustomOrderToDelivered,
  getMyCustomOrders,
  getCustomOrders,
}
