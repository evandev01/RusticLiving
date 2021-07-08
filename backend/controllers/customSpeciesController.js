import asyncHandler from 'express-async-handler'
import CustomSpecies from '../models/customProductModels/customSpeciesModel.js'

// @desc    Fetch all custom species
// @route   GET /api/customspecies
// @access  Public
const getCustomSpecies = asyncHandler(async (req, res) => {
  const customSpecies = await CustomSpecies.find({})

  if (customSpecies) {
    res.json(customSpecies)
  } else {
    res.status(404)
    throw new Error('Custom species not found')
  }
})

// @desc    Fetch single custom species
// @route   GET /api/customspecies/:id
// @access  Public
const getCustomSpeciesById = asyncHandler(async (req, res) => {
  const customSpecies = await CustomSpecies.findById(req.params.id)

  if (customSpecies) {
    res.json(customSpecies)
  } else {
    res.status(404)
    throw new Error('Custom species not found')
  }
})

// @desc    Create a new custom species
// @route   POST /api/customspecies
// @access  Private/Admin
const createCustomSpecies = asyncHandler(async (req, res) => {
  const { speciesName, speciesImage } = req.body

  const customSpecies = new CustomSpecies({
    speciesName: speciesName,
    speciesImage: speciesImage,
    user: req.user._id,
  })

  const createdCreatedCustomSpecies = await customSpecies.save()
  res.status(201).json(createdCreatedCustomSpecies)
})

// @desc    Update a custom species
// @route   PUT /api/customspecies/:id
// @access  Private/Admin

const updateCustomSpecies = asyncHandler(async (req, res) => {
  const { speciesName, speciesImage } = req.body

  const customSpecies = await CustomSpecies.findById(req.params.id)

  if (customSpecies) {
    customSpecies.speciesName = speciesName
    customSpecies.speciesImage = speciesImage

    const updatedCustomSpecies = await customSpecies.save()

    res.json(updatedCustomSpecies)
  } else {
    res.status(404)
    throw new Error('Custom species not found')
  }
})

// @desc    Delete a custom species
// @route   DELETE /api/customspecies/:id
// @access  Private/Admin
const deleteCustomSpecies = asyncHandler(async (req, res) => {
  const customSpecies = await CustomSpecies.findById(req.params.id)

  if (customSpecies) {
    await customSpecies.remove()
    res.json({ message: 'Custom species removed' })
  } else {
    res.status(404)
    throw new Error('Custom species not found')
  }
})

export {
  getCustomSpecies,
  getCustomSpeciesById,
  createCustomSpecies,
  updateCustomSpecies,
  deleteCustomSpecies,
}
