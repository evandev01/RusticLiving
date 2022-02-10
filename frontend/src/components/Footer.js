import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import FB_LOGO from '../assets/logos/fb_logo.png'
import IG_LOGO from '../assets/logos/ig_logo.png'
import TT_LOGO from '../assets/logos/tt_logo.png'

const Footer = () => {
  return (
    <footer>
      <Container className='text-center mt-5'>
        <Row>
          <Col className='text-center p-3'>
            <p
              className='text-center'
              style={{
                textDecoration: 'none',
                fontSize: '1.2em',
              }}
            >
              <a
                href='https://www.google.com/search?q=rustic+living+hobart+indiana'
                target='_blank'
                style={{
                  textDecoration: 'none',
                  fontSize: '1em',
                }}
              >
                Rustic Living
                <br />
                223 Center St
                <br />
                Hobart, IN 46342
              </a>
              <br />
              <a
                href='tel:+12197131371'
                style={{ textDecoration: 'none', fontSize: '1em' }}
              >
                (219)713-1371
              </a>
            </p>
          </Col>
        </Row>

        <Row>
          <Col className='text-center p-2'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11946.727473261486!2d-87.25369!3d41.5328313!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3a308cdfcdfbeed4!2sRustic%20Living!5e0!3m2!1sen!2sus!4v1644508055272!5m2!1sen!2sus'
              height='250px'
              width='auto'
              style={{ border: '0' }}
              allowfullscreen='true'
              loading='lazy'
              title='directions'
            ></iframe>
          </Col>
        </Row>

        <Row>
          <Col className='text-center p-3'>
            <p className='text-center'>
              <a
                href='https://www.facebook.com/RusticLivingNWI/'
                target='_blank'
              >
                <Image
                  alt='Facebook'
                  src={FB_LOGO}
                  style={{ maxHeight: '100px', width: 'auto' }}
                />
              </a>
              <br />
              Facebook
            </p>
          </Col>
          <Col className='text-center p-3'>
            <p className='text-center'>
              <a
                href='https://www.instagram.com/rustic_living_life/'
                target='_blank'
              >
                <Image
                  alt='Instagram'
                  src={IG_LOGO}
                  style={{ maxHeight: '100px', width: 'auto' }}
                />
              </a>
              <br />
              Instagram
            </p>
          </Col>
          <Col className='text-center p-3'>
            <p className='text-center'>
              <a
                href='https://www.tiktok.com/search?lang=en&q=rusticlivingnwi&t=1644523117731'
                target='_blank'
              >
                <Image
                  alt='TikTok'
                  src={TT_LOGO}
                  style={{ maxHeight: '100px', width: 'auto' }}
                />
              </a>
              <br />
              TikTok
            </p>
          </Col>
        </Row>
        <Row>
          <Col className='text-center'>Copyright &copy; Rustic Living</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
