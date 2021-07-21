import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CustomPriceButtons = () => {
  return (
    <>
      <Link to='/admin/customproducts' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <Row className='align-items-center'>
        <Col className='text-center'>
          <LinkContainer
            className='btn btn-dark btn-lg my-3'
            to='/admin/customprices'
          >
            <h1>Custom Prices</h1>
          </LinkContainer>
        </Col>
      </Row>
      <Row className='align-items-center'>
        <Col className='text-center'>
          <LinkContainer to='/admin/customprices/table'>
            <Button variant='outline-success' size='md'>
              Table
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/customprices/bedframe'>
            <Button variant='outline-success' size='md' block>
              Bed Frame
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/customprices/door'>
            <Button variant='outline-success' size='md' block>
              Door
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/customprices/paint'>
            <Button variant='outline-success' size='md' block>
              Paint
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/customprices/stain'>
            <Button variant='outline-success' size='md' block>
              Stain
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/customprices/accent'>
            <Button variant='outline-success' size='md' block>
              Accent
            </Button>
          </LinkContainer>
        </Col>
      </Row>
    </>
  )
}

export default CustomPriceButtons
