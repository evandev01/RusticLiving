import mongoose from 'mongoose'

const paintSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productType: { type: String, required: true },
    paintName: { type: String, required: true },
    paintImage: { type: String, required: false },
    paintPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
)

const Paint = mongoose.model('Paint', paintSchema)

export default Paint
