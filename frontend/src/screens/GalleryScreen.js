import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listGalleryPhotos } from '../actions/galleryActions'
import GalleryModal from '../components/GalleryModal'
import { motion } from 'framer-motion'

const GalleryScreen = () => {
  const [show, setShow] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState(null)
  const [photoIndex, setPhotoIndex] = useState(0)

  const dispatch = useDispatch()

  const galleryPhotoList = useSelector(state => state.galleryPhotoList)
  const { loading, error, photos } = galleryPhotoList

  useEffect(() => {
    dispatch(listGalleryPhotos())
  }, [dispatch])

  const handleClose = () => {
    setCurrentPhoto(null)
    setShow(false)
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <div className='img-grid'>
        {photos &&
          photos.map((photo, index) => (
            <>
              <motion.div
                className='img-wrap'
                layout
                whileHover={{ opacity: 0.3 }}
              >
                <motion.img
                  // className='photos'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  src={photo.image}
                  onClick={() => {
                    // setCurrentPhoto(photo.image)
                    setPhotoIndex(index)
                    setShow(true)
                  }}
                  fluid
                />
              </motion.div>
            </>
          ))}{' '}
      </div>
      {show && (
        <GalleryModal
          show={show}
          setShow={setShow}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          onHide={handleClose}
          // handleNext={handleNext(imageHandler)}
          // handlePrev={handlePrev}
          currentPhoto={photos[photoIndex].image}
          setCurrentPhoto={setCurrentPhoto}
        />
      )}
    </>
  )
}

export default GalleryScreen
