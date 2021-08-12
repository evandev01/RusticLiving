import mongoose from 'mongoose'

const customPreOrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productType: { type: String, required: true },
    qty: { type: Number, required: false, default: 0 },
    size: { type: Number, required: true, default: 0 },
    speciesName: { type: String, required: true },
    speciesImage: { type: String, required: true },
    speciesTotal: { type: Number, required: true, default: 0.0 },
    stainName: { type: String, required: true },
    stainImage: { type: String, required: true },
    stainTotal: { type: Number, required: true, default: 0.0 },
    paintName: { type: String, required: true },
    paintImage: { type: String, required: true },
    paintTotal: { type: Number, required: true, default: 0.0 },
    baseName: { type: String, required: true },
    baseImage: { type: String, required: true },
    baseTotal: { type: Number, required: true, default: 0.0 },
    subtotal: { type: Number, required: true, default: 0.0 },
    estCompDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const CustomPreOrder = mongoose.model('CustomPreOrder', customPreOrderSchema)

export default CustomPreOrder
