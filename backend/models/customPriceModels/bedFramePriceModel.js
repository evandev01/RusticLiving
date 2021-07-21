import mongoose from 'mongoose'

const bedFramePriceSchema = mongoose.Schema({
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

const BedFramePrice = mongoose.model('BedFramePrice', bedFramePriceSchema)

export default BedFramePrice
