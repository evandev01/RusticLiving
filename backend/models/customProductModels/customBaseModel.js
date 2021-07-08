import mongoose from 'mongoose'

const customBaseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    baseName: { type: String, required: true },
    baseImage: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

const CustomBase = mongoose.model('CustomBase', customBaseSchema)

export default CustomBase
