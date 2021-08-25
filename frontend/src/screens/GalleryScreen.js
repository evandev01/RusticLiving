import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listGalleryPhotos } from '../actions/galleryActions'
// import Gallery from 'react-photo-gallery'
// import Carousel, { Modal, ModalGateway } from 'react-images'
// import { Link } from 'react-router-dom'
// import GalleryModal from '../components/GalleryModal'
// import GalleryCarouselModal from '../components/GalleryCarouselModal'
// import GalleryImageScreen from './GalleryImageScreen'
// import { LinkContainer } from 'react-router-bootstrap'
// import { FullScreen, useFullScreenHandle } from 'react-full-screen'
// import Lightbox from 'react-awesome-lightbox'
// import { ImageGroup, Image } from 'react-fullscreen-image'
// import { FullScreen, useFullScreenHandle } from 'react-full-screen'
// import fscreen from 'fscreen'
// import ImageGallery from 'react-image-gallery'

const GalleryScreen = () => {
  const dispatch = useDispatch()

  const galleryPhotoList = useSelector(state => state.galleryPhotoList)
  const { loading, error, photos } = galleryPhotoList

  useEffect(() => {
    // if (!photos) {
    dispatch(listGalleryPhotos())
    // }
  }, [dispatch])

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
                    document
                      .getElementById(`image-${index}`)
                      .requestFullscreen()
                  }}
                  fluid
                />
              </Col>
            </>
          ))
        )}
      </Row>
    </>
  )
  //     <ImageGallery items={images} />

  {
    /* <Row>
        {imgList &&
          imgList.map((product, index) => (
            <>
              <Col md={2} key={index} className='m-3'>
                {document.fullscreenElement === true && (
                  <Button> {'<'} </Button>
                )}
                <Image
                  id={`image-${index}`}
                  key={index}
                  src={product}
                  onClick={() => {
                    document
                      .getElementById(`image-${index}`)
                      .requestFullscreen()
                    onClickForward()
                  }}
                  fluid
                />
                {document.fullscreenElement === true && (
                  <Button> {'>'} </Button>
                )}
              </Col>
            </>
          ))}
      </Row> */
  }

  {
    /* <Row className='mt-5'>
        <Col className='text-center'>
          <h4>Gallery</h4>
          <Carousel pause='hover' className='bg-dark'>
            {images &&
              images.map((product, index) => (
                <Carousel.Item key={index}>
                  <Image
                    id={`car-${product}`}
                    image={product}
                    key={index}
                    src={product}
                    alt='gallery image'
                    className='mx-auto'
                    fluid
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </Col>
      </Row> */
  }
}

export default GalleryScreen
