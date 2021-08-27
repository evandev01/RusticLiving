import React from 'react'
import { Modal, Image, Row, Col, Button, Container } from 'react-bootstrap'

const NavArrows = () => {
  return (
    <>
      <Row>
        <Button style={{ zIndex: '10', color: 'white' }}>{' < '}</Button>
        <Button style={{ zIndex: '10', color: 'white' }}>{' > '}</Button>
      </Row>
    </>
  )
}

export default NavArrows
