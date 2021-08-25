import React from 'react'
import { Modal, Image, Row, Col, Carousel } from 'react-bootstrap'

const GalleryModal = ({ show, image, images, setImage, onHide, index }) => {
  return (
    <>
      <Modal
        className='gallery-modal text-center'
        show={show}
        onHide={onHide}
        // size='xl'
        scrollable
        centered
        // fullscreen
      >
        <Modal.Header style={{ height: '2rem' }} closeButton />
        <Carousel size='xl'>
          {images &&
            images.map(x => (
              <Carousel.Item>
                <Image
                  style={{ height: '100%', width: 'auto' }}
                  key={x}
                  src={images[index++]}
                  // fluid
                />
              </Carousel.Item>
            ))}
        </Carousel>
        <Row className='mt-2'></Row>
      </Modal>
    </>
  )
}

export default GalleryModal
