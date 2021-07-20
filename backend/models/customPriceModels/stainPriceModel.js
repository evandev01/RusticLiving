import mongoose from 'mongoose'

const stainPriceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  productType: { type: String, required: true },
  pricePerSqFt: { type: Number, required: true },
})

const StainPrice = mongoose.model('StainPrice', stainPriceSchema)

export default StainPrice
