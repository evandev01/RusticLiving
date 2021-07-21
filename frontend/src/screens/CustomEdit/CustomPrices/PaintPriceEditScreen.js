import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import FormContainer from '../../../components/FormContainer'
import {
  listPaintPriceDetails,
  updatePaintPrice,
} from '../../../actions/customPrices/paintPriceActions'
import { PAINT_PRICE_UPDATE_RESET } from '../../../constants/priceConstants/paintPriceConstants'

const PaintPriceEditScreen = ({ match, history }) => {
  const priceId = match.params.id

  const [productType, setProductType] = useState('')
  const [pricePerSqFt, setPricePerSqFt] = useState('')

  const dispatch = useDispatch()

  const paintPriceDetails = useSelector(state => state.paintPriceDetails)
  const {
    loading: loadingDetails,
    error: errorDetails,
    paintPrice,
  } = paintPriceDetails

  const paintPriceUpdate = useSelector(state => state.paintPriceUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = paintPriceUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PAINT_PRICE_UPDATE_RESET })
      history.push('/admin/customprices/paint')
    }
    if (!paintPrice.productType || priceId !== paintPrice._id) {
      dispatch(listPaintPriceDetails(priceId))
    } else {
      if (paintPrice) {
        setProductType(paintPrice.productType)
        setPricePerSqFt(paintPrice.pricePerSqFt)
      }
    }
  }, [dispatch, history, paintPrice, priceId, successUpdate, userInfo])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updatePaintPrice({
        _id: priceId,
        productType,
        pricePerSqFt,
      })
    )
  }

  return (
    <>
      <Link to='/admin/customprices/paint' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Edit Paint Price</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant='danger'>{errorDetails}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='productType'>
              <Form.Label>Product Type</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter product type'
                value={productType}
                onChange={e => setProductType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='pricePerSqFt'>
              <Form.Label>Price Per Sq Ft</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price per sq ft'
                value={pricePerSqFt}
                onChange={e => setPricePerSqFt(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default PaintPriceEditScreen
