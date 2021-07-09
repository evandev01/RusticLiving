import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CustomProductScreen = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
  }, [userInfo, history])

  return (
    <>
      <Row className='align-items-center'>
        <Col className='text-center'>
          <LinkContainer
            className='btn btn-dark btn-lg my-3'
            to='/admin/customproducts'
          >
            <h1>Custom Products</h1>
          </LinkContainer>
        </Col>
      </Row>
      <Row className='align-items-center'>
        <Col className='text-center'>
          <LinkContainer to='/admin/customproductlist'>
            <Button variant='outline-success' size='md'>
              Products
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/customspecieslist'>
            <Button variant='outline-success' size='md' block>
              Species
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/custombaselist'>
            <Button variant='outline-success' size='md' block>
              Bases
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/custompaintlist'>
            <Button variant='outline-success' size='md' block>
              Paints
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/customstainlist'>
            <Button variant='outline-success' size='md' block>
              Stains
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/customaccentlist'>
            <Button variant='outline-success' size='md' block>
              Accents
            </Button>
          </LinkContainer>
        </Col>
      </Row>
    </>
  )
}

export default CustomProductScreen
