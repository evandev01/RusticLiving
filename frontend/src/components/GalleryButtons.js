import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CustomProductButtons = () => {
  return (
    <>
      <Row className='align-items-center'>
        <Col className='text-center'>
          <LinkContainer
            className='btn btn-dark btn-lg my-3'
            to='/admin/gallery'
          >
            <h1>Gallery</h1>
          </LinkContainer>
        </Col>
      </Row>
    </>
  )
}

export default CustomProductButtons
