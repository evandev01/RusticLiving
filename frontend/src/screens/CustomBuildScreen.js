import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Image } from 'react-bootstrap'

const CustomBuildScreen = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      alert('Please login to build your own')
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <>
      <Row>
        <Col className='text-center'>
          <h2>Select Product</h2>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col md={3}>
          <LinkContainer to='/customize/table'>
            <Image />
          </LinkContainer>
          <Link to='/customize/table'>
            <h1 className='text-center'>Table</h1>
          </Link>
        </Col>

        <Col>
          <LinkContainer to='/customize/bedframe'>
            <Image />
          </LinkContainer>
          <Link to='/customize/bedframe'>
            <h1 className='text-center'>Bed Frame</h1>
          </Link>
        </Col>

        <Col md={3}>
          <LinkContainer to='/customize/door'>
            <Image />
          </LinkContainer>
          <Link to='/customize/door'>
            <h1 className='text-center'>Door</h1>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default CustomBuildScreen
