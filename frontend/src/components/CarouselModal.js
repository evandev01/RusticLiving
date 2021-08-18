import React from 'react'
import { Modal, Image } from 'react-bootstrap'

const CarouselModal = ({ show, image, fullscreen, onHide }) => {
  return (
    <>
      <Modal
        show={show}
        fullscreen={fullscreen}
        onHide={onHide}
        style={{ maxHeight: '500px' }}
      >
        <Modal.Header closeButton />
        <Image
          src={image}
          alt='featured product'
          style={{ maxHeight: '500px', width: 'auto', objectFit: 'contain' }}
        />
      </Modal>
    </>
  )
}

export default CarouselModal
