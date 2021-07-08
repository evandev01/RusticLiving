import mongoose from 'mongoose'

const customAccentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    accentName: { type: String, required: true },
    accentImage: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

const CustomAccent = mongoose.model('CustomAccent', customAccentSchema)

export default CustomAccent
