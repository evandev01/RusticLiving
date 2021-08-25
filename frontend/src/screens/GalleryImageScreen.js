import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Image } from 'react-bootstrap'

const GalleryImageScreen = ({ image, index }) => {
  return (
    // go back button in the form of an 'x'
    // 'next' and previous buttons
    <>
      <Link className='btn btn-dark my-3 p-3' to='/gallery'>
        Go Back
      </Link>
      <Row>
        <Col className='text-center'>
          <Button className='btn btn-dark my-3'>{'<'} Prev</Button>
        </Col>
        <Col className='text-center'>
          <Button className='btn btn-dark my-3'>Next {'>'}</Button>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Image src={image && image} />
        </Col>
      </Row>
    </>
  )
}

export default GalleryImageScreen
