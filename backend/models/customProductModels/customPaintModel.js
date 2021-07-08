import mongoose from 'mongoose'

const customPaintSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    paintName: { type: String, required: true },
    paintImage: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

const CustomPaint = mongoose.model('CustomPaint', customPaintSchema)

export default CustomPaint
