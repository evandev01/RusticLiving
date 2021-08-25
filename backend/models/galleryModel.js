import mongoose from 'mongoose'

const galleryPhotoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const GalleryPhoto = mongoose.model('GalleryPhoto', galleryPhotoSchema)

export default GalleryPhoto
