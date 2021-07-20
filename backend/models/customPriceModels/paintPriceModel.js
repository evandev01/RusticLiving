import mongoose from 'mongoose'

const paintPriceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  productType: { type: String, required: true },
  pricePerSqFt: { type: Number, required: true },
})

const PaintPrice = mongoose.model('PaintPrice', paintPriceSchema)

export default PaintPrice
