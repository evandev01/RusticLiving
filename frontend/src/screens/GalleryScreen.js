import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, Button, Modal } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listGalleryPhotos } from '../actions/galleryActions'
import GalleryModal from '../components/GalleryModal'
import NavArrows from '../components/NavArrows'
import { motion } from 'framer-motion'

const GalleryScreen = () => {
  const [show, setShow] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [photoIndex, setPhotoIndex] = useState(0)

  const dispatch = useDispatch()

  const galleryPhotoList = useSelector(state => state.galleryPhotoList)
  const { loading, error, photos } = galleryPhotoList

  useEffect(() => {
    dispatch(listGalleryPhotos())
  }, [dispatch])

  const handleClose = () => {
    setSelectedImage(null)
    setShow(false)
  }

  const handleNext = () => {
    setPhotoIndex(photoIndex === photos.length - 1 ? 0 : photoIndex + 1)
  }

  const handlePrev = () => {
    setPhotoIndex(photoIndex === 0 ? photos.length - 1 : photoIndex - 1)
  }

  // const updateSelectedImg = async () => {
  //   // if (photos && photoIndex) {
  //   //   setSelectedImage(photos[photoIndex].image)
  //   // }

  //   if (photos) {
  //     const image = photos.find(() => photos[photoIndex]image === selectedImage)
  //       setSelectedImage(image)
  //   }
  // }

  return (
    <>
      <div className='img-grid'>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {photos &&
          photos.map((photo, index) => (
            <>
              <motion.div
                // md={2}
                // key={index}
                // className='m-3'
                className='img-wrap'
                key={`img-wrap-${index}`}
                layout
                whileHover={{ opacity: 0.3 }}
              >
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  src={photo.image}
                  onClick={() => {
                    setPhotoIndex(
                      index === -1
                        ? photos.length - 1
                        : index === photos.length
                        ? 0
                        : index
                    )
                    setShow(true)
                    // setSelectedImage(photos[photoIndex].image)
                    // id={`image-${index}`}
                    // key={photo}
                    // console.log(`index: ${index}`)
                  }}
                  fluid
                />{' '}
              </motion.div>

              {/* <motion.div */}
              {/* animate={{ x: 100 }}
                transition={{ ease: 'easeIn', duration: 2 }}
              > */}
              <Modal
                className='gallery-modal'
                show={show}
                onHide={handleClose}
                fullscreen
                centered
              >
                <Row className='justify-content-center'>
                  <Modal.Header id='arrows'>
                    <Button id='right-arrow' size='md' onClick={handleNext}>
                      <i class='fa fa-chevron-right'></i>
                    </Button>
                    <Button id='left-arrow' size='md' onClick={handlePrev}>
                      <i class='fa fa-chevron-left'></i>
                    </Button>
                  </Modal.Header>
                  <Image
                    className='text-center'
                    id='modal-img'
                    src={photos[photoIndex].image}
                    onClick={handleNext}
                    centered
                    fullscreen
                  />
                </Row>
              </Modal>
              {/* </motion.div> */}
            </>
          ))}
      </div>
    </>
  )
}

export default GalleryScreen

//   {
//   document
//     .getElementById(`image-${index}`)
//     .requestFullscreen()
// }
