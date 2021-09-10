import React from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const GalleryModal = ({
  // handleNext,
  // handlePrev,
  photoIndex,
  setPhotoIndex,
  currentPhoto,
  setCurrentPhoto,
  setShow,
}) => {
  const galleryPhotoList = useSelector(state => state.galleryPhotoList)
  const { loading, error, photos } = galleryPhotoList

  const handleClick = e => {
    if (e.target.classList.contains('backdrop')) {
      setShow(false)
    }
  }

  const nextHandler = () => {
    let index = photoIndex
    index++
    setPhotoIndex(index === photos.length ? 0 : index)
  }

  return (
    <>
      <motion.div
        className='backdrop'
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* <Button id='left-arrow' size='md' onClick={() => handlePrev()}>
          <i class='fa fa-chevron-left'></i>
        </Button>
        <Button id='right-arrow' size='md' onClick={() => handleNext()}>
          <i class='fa fa-chevron-right'></i>
        </Button> */}
        {/* {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>} */}

        <motion.img
          initial={{ y: '-100vh' }}
          animate={{ y: 0 }}
          src={currentPhoto}
          onClick={e => {
            console.log(e.target)
            nextHandler()
          }}
        />
      </motion.div>
    </>
  )
}

export default GalleryModal
