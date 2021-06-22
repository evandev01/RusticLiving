import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} Reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>
          <div className='my-3'>${product.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

Rating.defaultProps = {
  color: '#f8e825'
}

export default Product
