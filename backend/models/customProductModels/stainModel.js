import mongoose from 'mongoose'

const customStainSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productType: { type: String, required: true },
    stainName: { type: String, required: true },
    stainImage: { type: String, required: false },
    stainPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
)

const CustomStain = mongoose.model('CustomStain', customStainSchema)

export default CustomStain
