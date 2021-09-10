import React from 'react'
import { Modal, Image } from 'react-bootstrap'

const CarouselModal = ({ show, image, images, setImage, onHide }) => {
  return (
    <>
      <div className='backdrop'>
        <Modal
          className='carousel-modal'
          show={show}
          onHide={onHide}
          centered
          fullscreen
        >
          <Image src={image} alt='featured product' className='car-img' />
        </Modal>
      </div>
    </>
  )
}

export default CarouselModal
