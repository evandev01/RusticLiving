import mongoose from 'mongoose'

const customSpeciesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    speciesName: { type: String, required: true },
    speciesImage: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

const CustomSpecies = mongoose.model('CustomSpecies', customSpeciesSchema)

export default CustomSpecies
