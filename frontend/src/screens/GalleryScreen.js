import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, Button, Modal } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listGalleryPhotos } from '../actions/galleryActions'
import GalleryModal from '../components/GalleryModal'
import NavArrows from '../components/NavArrows'
import { motion } from 'framer-motion'
import ReactCSSTransitionGroup from 'react-transition-group'
import GalleryImageScreen from './GalleryImageScreen'

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

{
  /* <Link to={'/galleryimages'}> */
}
{
  /* </Link> */
}

{
  /* <GalleryImageScreen
        show={show}
        setShow={setShow}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleClose={handleClose}
        photoIndex={photoIndex}
      /> */
}
// {
//   show && (
//     <motion.div
//       // animate={{ y: 0 }}
//       // transition={{ ease: 'easeIn', duration: 2 }}
//       className='gallery-modal'
//       show={show}
//       onHide={handleClose}
//       // fullscreen
//       // centered
//     >
//       <button id='right-arrow' size='md' onClick={handleNext}>
//         <i class='fa fa-chevron-right'></i>
//       </button>
//       <button id='left-arrow' size='md' onClick={handlePrev}>
//         <i class='fa fa-chevron-left'></i>
//       </button>
//       <motion.img
//         className='text-center'
//         id='modal-img'
//         src={photos[photoIndex].image}
//         onClick={handleNext}
//         centered
//         fullscreen
//       />
//     </motion.div>
//   )
// }
