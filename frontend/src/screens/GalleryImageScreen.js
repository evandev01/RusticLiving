import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, Button, Modal, Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listGalleryPhotos } from '../actions/galleryActions'
import GalleryModal from '../components/GalleryModal'
import NavArrows from '../components/NavArrows'
import { motion } from 'framer-motion'

const GalleryImageScreen = ({
  photoIndex,
  handleNext,
  handlePrev,
  currentPhoto,
}) => {
  const dispatch = useDispatch()

  const galleryPhotoList = useSelector(state => state.galleryPhotoList)
  const { loading, error, photos } = galleryPhotoList

  useEffect(() => {
    dispatch(listGalleryPhotos())
  }, [dispatch])

  return (
    <>
      <Container>
        <Row className='justify-content-center'>
          <Col id='arrows'>
            <Button id='left-arrow' size='md' onClick={() => handlePrev()}>
              <i class='fa fa-chevron-left'></i>
            </Button>
          </Col>

          <Col>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            {photos && photoIndex && (
              <Image
                className='text-center'
                id='modal-img'
                src={currentPhoto ? currentPhoto : photos[photoIndex].image}
                onClick={() => handleNext()}
                centered
                fullscreen
              />
            )}
          </Col>

          <Col>
            <Button id='right-arrow' size='md' onClick={() => handleNext()}>
              <i class='fa fa-chevron-right'></i>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default GalleryImageScreen
