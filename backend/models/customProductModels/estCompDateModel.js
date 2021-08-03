import mongoose from 'mongoose'

const estCompDateSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    estCompDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const EstCompDate = mongoose.model('EstCompDate', estCompDateSchema)

export default EstCompDate
