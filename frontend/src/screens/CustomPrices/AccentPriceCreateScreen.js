import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import FormContainer from '../../../components/FormContainer'
import { createAccentPrice } from '../../../actions/customPrices/accentPriceActions'
import { ACCENT_PRICE_CREATE_RESET } from '../../../constants/priceConstants/accentPriceConstants'

const AccentPriceCreateScreen = ({ history }) => {
  const [productType, setProductType] = useState('')
  const [pricePerUnit, setPricePerUnit] = useState('')

  const dispatch = useDispatch()

  const accentPriceCreate = useSelector(state => state.accentPriceCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = accentPriceCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      dispatch({ type: ACCENT_PRICE_CREATE_RESET })
      history.push('/admin/customprices/accent')
    }
  }, [dispatch, history, userInfo, successCreate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createAccentPrice({
        productType,
        pricePerUnit,
      })
    )
  }

  return (
    <>
      <Link to='/admin/customprices/accent' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Create Accent Price</h1>
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

            <Form.Group controlId='pricePerUnit'>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price per unit'
                value={pricePerUnit}
                onChange={e => setPricePerUnit(e.target.value)}
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

export default AccentPriceCreateScreen
