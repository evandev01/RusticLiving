import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listGalleryPhotos } from '../actions/galleryActions'
import GalleryModal from '../components/GalleryModal'
import NavArrows from '../components/NavArrows'

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
    setPhotoIndex(photoIndex + 1)
    if (photoIndex === photos.length) {
      setSelectedImage(photos[0].image)
      setPhotoIndex(1)
    } else if (photoIndex) {
      setSelectedImage(photos[photoIndex].image)
    }
    console.log(`photo index: ${photoIndex}`)
  }

  const handlePrev = () => {
    setPhotoIndex(photoIndex - 1)

    if (photoIndex === 0) {
      setSelectedImage(photos[photos.length].image)
      setPhotoIndex(photos.length)
    } else if (photoIndex) {
      setSelectedImage(photos[photoIndex].image)
    }

    console.log(`photo index: ${photoIndex}`)
    // if (photoIndex === ) {
    //   console.log(`photo index: ${photoIndex}`)
    // }
  }

  return (
    <>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          photos &&
          photos.map((photo, index) => (
            <>
              <Col md={2} key={index} className='m-3'>
                <Image
                  id={`image-${index}`}
                  key={photo}
                  src={photo.image}
                  onClick={() => {
                    setPhotoIndex(index + 1)
                    setSelectedImage(photo.image)
                    setShow(true)
                  }}
                  fluid
                />
              </Col>
            </>
          ))
        )}

        {show && selectedImage !== null ? (
          <>
            <GalleryModal
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              photoIndex={photoIndex}
              handleNext={handleNext}
              handlePrev={handlePrev}
              show={show}
              onHide={handleClose}
            />
          </>
        ) : (
          () => {
            setSelectedImage(null)
            setShow(false)
          }
        )}
      </Row>
    </>
  )
}

export default GalleryScreen

//   {
//   document
//     .getElementById(`image-${index}`)
//     .requestFullscreen()
// }
