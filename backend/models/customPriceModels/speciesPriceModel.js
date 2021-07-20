import mongoose from 'mongoose'

const speciesPriceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  speciesName: { type: String, required: true },
  productType: { type: String, required: true },
  pricePerSqFt: {
    type: Number,
    required: true,
    default: 0,
  },
})

const SpeciesPrice = mongoose.model('Species Price', speciesPriceSchema)

export default SpeciesPrice
