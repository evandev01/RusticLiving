import asyncHandler from 'express-async-handler'
import BedFrame from '../../models/customProductModels/bedFrameModel.js'

// @desc    Fetch all bedframes
// @route   GET /api/custom/bedframe
// @access  Public
const getBedFrames = asyncHandler(async (req, res) => {
  const bedframes = await BedFrame.find({})

  if (bedframes) {
    res.json(bedframes)
  } else {
    res.status(404)
    throw new Error('Bed frames not found')
  }
})

// @desc    Fetch single bed frame
// @route   GET /api/custom/bedframe/:id
// @access  Public
const getBedFrameById = asyncHandler(async (req, res) => {
  const bedframe = await BedFrame.findById(req.params.id)

  if (bedframe) {
    res.json(bedframe)
  } else {
    res.status(404)
    throw new Error('Bedframe  not found')
  }
})

// @desc    Create bed frame
// @route   POST /api/custom/bedframe
// @access  Private/Admin
const createBedFrame = asyncHandler(async (req, res) => {
  const { speciesName, speciesImage, speciesPrice } = req.body

  const bedFrame = new BedFrame({
    speciesName: speciesName,
    speciesImage: speciesImage,
    speciesPrice: speciesPrice,
    user: req.user._id,
  })

  const createdBedframe = await bedFrame.save()

  res.status(201).json(createdBedframe)
})

// @desc    Update bed frame
// @route   PUT /api/custom/bedframe/:id
// @access  Private/Admin
const updateBedFrame = asyncHandler(async (req, res) => {
  const { speciesName, speciesImage, speciesPrice } = req.body

  const bedFrame = await BedFrame.findById(req.params.id)

  if (bedFrame) {
    bedFrame.speciesName = speciesName
    bedFrame.speciesImage = speciesImage
    bedFrame.speciesPrice = speciesPrice

    const updatedBedFrame = bedFrame.save()

    res.json(updatedBedFrame)
  } else {
    res.status(404)
    throw new Error('Bed frame not found')
  }
})

// @desc    Delete bed frame
// @route   DELETE /api/custom/bedframe/:id
// @access  Private/Admin
const deleteBedFrame = asyncHandler(async (req, res) => {
  const bedFrame = await BedFrame.findById(req.params.id)

  if (bedFrame) {
    await bedFrame.remove()
    res.json({ message: 'Bed frame removed' })
  } else {
    res.status(404)
    throw new Error('Bed frame not found')
  }
})

export {
  getBedFrames,
  getBedFrameById,
  createBedFrame,
  updateBedFrame,
  deleteBedFrame,
}
