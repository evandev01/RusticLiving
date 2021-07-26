import mongoose from 'mongoose'

const baseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productType: { type: String, required: true },
    baseName: { type: String, required: true },
    baseImage: { type: String, required: false },
    basePrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
)

const Base = mongoose.model('Base', baseSchema)

export default Base
