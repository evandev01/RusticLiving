import React from 'react'
import { Modal, Image, Row, Col } from 'react-bootstrap'

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

{
  /* <Modal.Header /> */
}
{
  /* <Row className='mt-2'>
          {images &&
            images.map(x => (
              <Col>
                <Image key={x} src={x} onClick={() => setImage(x)} fluid />
              </Col>
            ))}
        </Row> */
}
