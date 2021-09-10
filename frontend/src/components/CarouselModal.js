import React from 'react'
import { Modal, Image, Row, Col } from 'react-bootstrap'

const CarouselModal = ({ show, image, images, setImage, onHide }) => {
  return (
    <>
      <Modal
        className='carousel-modal'
        show={show}
        onHide={onHide}
        centered
        fullscreen
      >
        {/* <Modal.Header /> */}
        <Image src={image} alt='featured product' className='car-img' />
        {/* <Row className='mt-2'>
          {images &&
            images.map(x => (
              <Col>
                <Image key={x} src={x} onClick={() => setImage(x)} fluid />
              </Col>
            ))}
        </Row> */}
      </Modal>
    </>
  )
}

export default CarouselModal
