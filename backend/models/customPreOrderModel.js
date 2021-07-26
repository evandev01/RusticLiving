import mongoose from 'mongoose'

const customPreOrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    customPreOrder: {
      productType: { type: String, required: true },
      qty: { type: Number, required: false },
      size: { type: Number, required: true },
      speciesType: { type: String, required: true },
      speciesPrice: { type: Number, required: true },
      stainType: { type: String, required: false },
      stainPrice: { type: Number, required: true },
      paintType: { type: String, required: true },
      paintPrice: { type: Number, required: true },
      subtotalPrice: { type: Number, required: true, default: 0.0 },
      estCompletionDate: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
)

const CustomPreOrder = mongoose.model('CustomPreOrder', customPreOrderSchema)

export default CustomPreOrder
