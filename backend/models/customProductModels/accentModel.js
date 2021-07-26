import mongoose from 'mongoose'

const accentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productType: { type: String, required: true },
    accentName: { type: String, required: true },
    accentImage: { type: String, required: false },
    accentPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
)

const Accent = mongoose.model('Accent', accentSchema)

export default Accent
