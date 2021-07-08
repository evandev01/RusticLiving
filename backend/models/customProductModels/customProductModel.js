import mongoose from 'mongoose'

const customProductSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productName: { type: String, required: true },
    estCompletionDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const CustomProduct = mongoose.model('CustomProduct', customProductSchema)

export default CustomProduct
