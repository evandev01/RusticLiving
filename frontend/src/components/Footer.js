import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <p className='text-center pt-3'>
            Rustic Living
            <br />
            223 Center St
            <br />
            Hobart, IN 46342
            <br />
            (219)713-1371
          </p>
        </Row>
        <Row>
          <Col className='text-center pb-3'>Copyright &copy; Rustic Living</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
