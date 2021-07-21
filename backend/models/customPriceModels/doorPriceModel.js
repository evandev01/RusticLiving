import mongoose from 'mongoose'

const doorPriceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  speciesName: { type: String, required: true },
  pricePerSqFt: {
    type: Number,
    required: true,
    default: 0,
  },
})

const DoorPrice = mongoose.model('DoorPrice', doorPriceSchema)

export default DoorPrice
