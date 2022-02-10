import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container className='text-center mt-5'>
        <Row>
          <Col className='text-center'>
            <p className='text-center mt-3'>
              <a
                href='https://www.google.com/search?q=rustic+living+hobart+indiana'
                style={{ textDecoration: 'none' }}
              >
                Rustic Living
                <br />
                223 Center St
                <br />
                Hobart, IN 46342
              </a>
              <br />
              <a href='tel:+12197131371' style={{ textDecoration: 'none' }}>
                (219)713-1371
              </a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className='text-center p-3'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11946.727473261486!2d-87.25369!3d41.5328313!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3a308cdfcdfbeed4!2sRustic%20Living!5e0!3m2!1sen!2sus!4v1644508055272!5m2!1sen!2sus'
              width='400'
              height='auto'
              style={{ border: '0' }}
              allowfullscreen='true'
              loading='lazy'
              title='directions'
            ></iframe>
          </Col>
        </Row>
        <Row>
          <Col className='text-center pb-3'>Copyright &copy; Rustic Living</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
