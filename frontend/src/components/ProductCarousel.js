import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image, Row, Col } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import Img1 from '../assets/carousel/img1.jpg'
import Img2 from '../assets/carousel/img2.jpg'
import Img3 from '../assets/carousel/img3.jpg'
import Img4 from '../assets/carousel/img4.jpg'
import Img5 from '../assets/carousel/img5.jpg'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const featuredImages = [Img1, Img2, Img3, Img4, Img5]

  const productTopRated = useSelector(state => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return (
    <>
      <Carousel pause='hover' className='bg-dark'>
        {featuredImages.map((product, index) => (
          <Carousel.Item key={index}>
            {/* <Link to={`/product/${product._id}`}> */}
            <Image
              src={product}
              alt='featured product'
              className='mx-auto'
              fluid
            />
            {/* <Carousel.Caption className='carousel-caption'></Carousel.Caption> */}
            {/* </Link> */}
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default ProductCarousel
