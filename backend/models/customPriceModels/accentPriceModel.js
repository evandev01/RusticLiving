import mongoose from 'mongoose'

const accentPriceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  productType: { type: String, required: true },
  pricePerUnit: { type: Number, required: true },
})

const AccentPrice = mongoose.model('AccentPrice', accentPriceSchema)

export default AccentPrice
