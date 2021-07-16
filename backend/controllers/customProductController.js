import asyncHandler from 'express-async-handler'
import CustomProduct from '../models/customProductModels/customProductModel.js'

// @desc    Fetch all custom products
// @route   GET /api/customproducts
// @access  Public
const getCustomProducts = asyncHandler(async (req, res) => {
  const customProducts = await CustomProduct.find({})

  if (customProducts) {
    res.json(customProducts)
  } else {
    res.status(404)
    throw new Error('No custom products found')
  }
})

// @desc    Fetch a single custom product
// @route   GET /api/customproducts/:id
// @access  Public
const getCustomProductById = asyncHandler(async (req, res) => {
  const customProduct = await CustomProduct.findById(req.params.id)

  if (customProduct) {
    res.json(customProduct)
  } else {
    res.status(404)
    throw new Error('No custom product found')
  }
})

// @desc    Create a new product
// @route   POST /api/customproducts
// @access  Private/Admin
const createCustomProduct = asyncHandler(async (req, res) => {
  const { productName, estCompletionDate } = req.body

  const customProduct = new CustomProduct({
    user: req.user._id,
    productName: productName,
    estCompletionDate: estCompletionDate,
  })

  const createdCreatedCustomProduct = await customProduct.save()
  res.status(201).json(createdCreatedCustomProduct)
})

// @desc    Update a custom product
// @route   PUT /api/customproducts/:id
// @access  Private/Admin

const updateCustomProduct = asyncHandler(async (req, res) => {
  const { productName, estCompletionDate } = req.body

  const customProduct = await CustomProduct.findById(req.params.id)

  if (customProduct) {
    customProduct.productName = productName
    customProduct.estCompletionDate = estCompletionDate

    const updatedCustomProduct = await customProduct.save()

    res.json(updatedCustomProduct)
  } else {
    res.status(404)
    throw new Error('Custom product not updated')
  }
})

// @desc    Delete a custom product
// @route   DELETE /api/customproducts/:id
// @access  Private/Admin
const deleteCustomProduct = asyncHandler(async (req, res) => {
  const customProduct = await CustomProduct.findById(req.params.id)

  if (customProduct) {
    await customProduct.remove()
    res.json({ message: 'Custom product removed' })
  } else {
    res.status(404)
    throw new Error('Custom product not found')
  }
})

export {
  getCustomProducts,
  getCustomProductById,
  createCustomProduct,
  updateCustomProduct,
  deleteCustomProduct,
}
