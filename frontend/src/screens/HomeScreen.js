import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import Logo from '../assets/logos/RusticLiving_White_LOGO_9_fav.png'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  return (
    <>
      <Row>
        <Col className='text-center'>
          <Image
            src={Logo}
            alt='Rustic Living Logo'
            id='header-logo'
            style={{ maxHeight: '250px', width: 'auto' }}
            // className='p-2'
          />
        </Col>
      </Row>

      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-dark'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
