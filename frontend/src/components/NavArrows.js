import React from 'react'
import { Row, Button } from 'react-bootstrap'

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
