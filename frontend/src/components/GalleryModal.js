import React from 'react'
import {
  Modal,
  Image,
  Row,
  Col,
  Button,
  Container,
  Carousel,
  Card,
} from 'react-bootstrap'

const GalleryModal = ({ show, src, onHide, handleNext, handlePrev }) => {
  return (
    <>
      {/* <Container> */}
      <Modal
        className='gallery-modal'
        show={show}
        onHide={onHide}
        fullscreen
        centered
      >
        <Row className='justify-content-center'>
          <Modal.Header id='arrows'>
            <Button id='right-arrow' size='md' onClick={() => handleNext()}>
              <i class='fa fa-chevron-right'></i>
            </Button>
            <Button id='left-arrow' size='md' onClick={() => handlePrev()}>
              <i class='fa fa-chevron-left'></i>
            </Button>
          </Modal.Header>
          <Image
            className='text-center'
            id='modal-img'
            src={src}
            onClick={() => handleNext()}
            centered
            fullscreen
          />
        </Row>
      </Modal>
      {/* </Container> */}
    </>
  )
}

export default GalleryModal
