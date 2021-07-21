import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import FormContainer from '../../../components/FormContainer'
import { createStainPrice } from '../../../actions/customPrices/stainPriceActions'
import { STAIN_PRICE_CREATE_RESET } from '../../../constants/priceConstants/stainPriceConstants'

const StainPriceCreateScreen = ({ history }) => {
  const [productType, setProductType] = useState('')
  const [pricePerSqFt, setPricePerSqFt] = useState('')

  const dispatch = useDispatch()

  const stainPriceCreate = useSelector(state => state.stainPriceCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = stainPriceCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      dispatch({ type: STAIN_PRICE_CREATE_RESET })
      history.push('/admin/customprices/stain')
    }
  }, [dispatch, history, userInfo, successCreate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createStainPrice({
        productType,
        pricePerSqFt,
      })
    )
  }

  return (
    <>
      <Link to='/admin/customprices/stain' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Create Stain Price</h1>
        {loadingCreate ? (
          <Loader />
        ) : errorCreate ? (
          <Message variant='danger'>{errorCreate}</Message>
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
              Save
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default StainPriceCreateScreen
