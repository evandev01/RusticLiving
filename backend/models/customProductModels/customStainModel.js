import mongoose from 'mongoose'

const customStainSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    stainName: { type: String, required: true },
    stainImage: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

const CustomStain = mongoose.model('CustomStain', customStainSchema)

export default CustomStain
