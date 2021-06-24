import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  // id of product in URL
  const productId = match.params.id

  // location.search accesses query at end of URL (ex: ?qty=1)
  // Split to left and right of '=' - ?qty is [0] and the number is [1] index
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  // Save useDispatch function in constant, 'dispatch'
  const dispatch = useDispatch()

  // Get cartItems from state with useSelector function
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  console.log(cartItems)

  useEffect(() => {
    // If there is a productId in the URL, dispatch the addToCart action
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return <div>Cart</div>
}

export default CartScreen
