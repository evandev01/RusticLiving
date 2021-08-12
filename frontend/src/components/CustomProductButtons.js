import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CustomProductButtons = () => {
  return (
    <>
      <Row className='align-items-center'>
        <Col className='text-center'>
          <LinkContainer
            className='btn btn-dark btn-lg my-3'
            to='/admin/custom/products'
          >
            <h1>Custom Products</h1>
          </LinkContainer>
        </Col>
      </Row>
      <Row className='align-items-center'>
        <Col className='text-center'>
          <LinkContainer to='/admin/custom/tables'>
            <Button variant='outline-success' size='md'>
              Tables
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/custom/bedframes'>
            <Button variant='outline-success' size='md' block>
              Bed Frames
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/custom/doors'>
            <Button variant='outline-success' size='md' block>
              Doors
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/custom/bases'>
            <Button variant='outline-success' size='md' block>
              Bases
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/custom/accents'>
            <Button variant='outline-success' size='md' block>
              Accents
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/custom/paints'>
            <Button variant='outline-success' size='md' block>
              Paints
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/custom/stains'>
            <Button variant='outline-success' size='md' block>
              Stains
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/custom/estcompdates'>
            <Button variant='outline-success' size='md' block>
              estComp
            </Button>
          </LinkContainer>
        </Col>
      </Row>
    </>
  )
}

export default CustomProductButtons
