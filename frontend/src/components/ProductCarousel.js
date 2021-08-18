import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image, Row, Col, Modal } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import CarouselModal from './CarouselModal'
import { listTopProducts } from '../actions/productActions'
import Img1 from '../assets/carousel/IMG_1.jpg'
import Img2 from '../assets/carousel/IMG_2.jpeg'
import Img3 from '../assets/carousel/IMG_3.jpeg'
import Img4 from '../assets/carousel/IMG_4.jpg'
import Img5 from '../assets/carousel/IMG_5.jpeg'
import Img6 from '../assets/carousel/IMG_6.jpeg'
import Img7 from '../assets/carousel/IMG_7.jpg'
import Img8 from '../assets/carousel/IMG_8.jpeg'

const ProductCarousel = () => {
  const featuredImages = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8]
  const [show, setShow] = useState(false)
  const [fullscreen, setFullscreen] = useState(true)
  const [image, setImage] = useState('')

  const handleClose = () => {
    setShow(false)
    // setFullscreen(false)
  }

  const handleShow = product => {
    setShow(true)
    // setFullscreen(true)
    setImage(product)
  }

  const dispatch = useDispatch()

  const productTopRated = useSelector(state => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return (
    <>
      <Row className='mt-5'>
        <Col className='text-center'>
          <h4>Featured</h4>
          <Carousel pause='hover' className='bg-dark'>
            {featuredImages.map((product, index) => (
              <Carousel.Item key={index}>
                <Image
                  src={product}
                  alt='featured product'
                  className='mx-auto'
                  onClick={() => handleShow(product)}
                  fluid
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <CarouselModal
        image={image}
        show={show}
        fullscreen={fullscreen}
        onHide={handleClose}
      />
    </>
  )
}

export default ProductCarousel
