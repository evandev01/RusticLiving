import mongoose from 'mongoose'

const customDoorSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  speciesName: { type: String, required: true },
  speciesImage: { type: String, required: true },
  speciesPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
})

const CustomDoor = mongoose.model('CustomDoor', customDoorSchema)

export default CustomDoor
