import asyncHandler from 'express-async-handler'
import Door from '../../models/customProductModels/doorModel.js'

// @desc    Fetch all door
// @route   GET /api/custom/door
// @access  Public
const getDoors = asyncHandler(async (req, res) => {
  const doors = await Door.find({})

  if (doors) {
    res.json(doors)
  } else {
    res.status(404)
    throw new Error('Door not found')
  }
})

// @desc    Fetch single door
// @route   GET /api/custom/door/:id
// @access  Public
const getDoorById = asyncHandler(async (req, res) => {
  const door = await Door.findById(req.params.id)

  if (door) {
    res.json(door)
  } else {
    res.status(404)
    throw new Error('Door not found')
  }
})

// @desc    Create door
// @route   POST /api/custom/door
// @access  Private/Admin
const createDoor = asyncHandler(async (req, res) => {
  const { speciesName, speciesImage, speciesPrice } = req.body

  const door = new Door({
    speciesName: speciesName,
    speciesImage: speciesImage,
    speciesPrice: speciesPrice,
    user: req.user._id,
  })

  const createdDoor = await door.save()

  res.status(201).json(createdDoor)
})

// @desc    Update door
// @route   PUT /api/custom/door/:id
// @access  Private/Admin
const updateDoor = asyncHandler(async (req, res) => {
  const { speciesName, speciesImage, speciesPrice } = req.body

  const door = await Door.findById(req.params.id)

  if (door) {
    door.speciesName = speciesName
    door.speciesImage = speciesImage
    door.speciesPrice = speciesPrice

    const updatedDoor = door.save()

    res.json(updatedDoor)
  } else {
    res.status(404)
    throw new Error('Door not found')
  }
})

// @desc    Delete door
// @route   DELETE /api/custom/door/:id
// @access  Private/Admin
const deleteDoor = asyncHandler(async (req, res) => {
  const door = await Door.findById(req.params.id)

  if (door) {
    await door.remove()
    res.json({ message: 'Door removed' })
  } else {
    res.status(404)
    throw new Error('Door not found')
  }
})

export { getDoors, getDoorById, createDoor, updateDoor, deleteDoor }
