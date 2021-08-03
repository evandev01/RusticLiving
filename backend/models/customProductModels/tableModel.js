import mongoose from 'mongoose'

const tableSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    speciesName: { type: String, required: true },
    speciesImage: { type: String, required: true },
    speciesPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
)

const Table = mongoose.model('Table', tableSchema)

export default Table
