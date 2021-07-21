import mongoose from 'mongoose'

const tablePriceSchema = mongoose.Schema({
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

const TablePrice = mongoose.model('TablePrice', tablePriceSchema)

export default TablePrice
