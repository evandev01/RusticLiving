import React from 'react'
import {
  Modal,
  Image,
  Row,
  Col,
  Button,
  Container,
  Carousel,
} from 'react-bootstrap'

const GalleryModal = ({
  show,
  selectedImage,
  onHide,
  handleNext,
  handlePrev,
}) => {
  const handleDirection = e => {
    if (e.target.className === 'carousel-control-next-icon') {
      handleNext()
    }
    if (e.target.className === 'carousel-control-prev-icon') {
      handlePrev()
    }
  }
  return (
    <div className='backdrop'>
      <Modal
        size='xl'
        className='gallery-modal text-center'
        show={show}
        onHide={onHide}
      >
        <Carousel
          onClick={e => {
            console.log(e.target.className)
            handleDirection(e)
          }}
        >
          <Image
            id='modal-img'
            src={selectedImage}
            onClick={() => handleNext()}
          />
        </Carousel>
      </Modal>
    </div>
  )
}

export default GalleryModal
