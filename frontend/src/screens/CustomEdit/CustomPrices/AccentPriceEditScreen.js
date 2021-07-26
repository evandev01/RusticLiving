import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import FormContainer from '../../../components/FormContainer'
import {
  listAccentPriceDetails,
  updateAccentPrice,
} from '../../../actions/customPrices/accentPriceActions'
import { ACCENT_PRICE_UPDATE_RESET } from '../../../constants/priceConstants/accentPriceConstants'

const AccentPriceEditScreen = ({ match, history }) => {
  const priceId = match.params.id

  const [productType, setProductType] = useState('')
  const [pricePerUnit, setPricePerUnit] = useState('')

  const dispatch = useDispatch()

  const accentPriceDetails = useSelector(state => state.accentPriceDetails)
  const {
    loading: loadingDetails,
    error: errorDetails,
    accentPrice,
  } = accentPriceDetails

  const accentPriceUpdate = useSelector(state => state.accentPriceUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = accentPriceUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ACCENT_PRICE_UPDATE_RESET })
      history.push('/admin/customprices/accent')
    }
    if (!accentPrice.productType || priceId !== accentPrice._id) {
      dispatch(listAccentPriceDetails(priceId))
    } else {
      if (accentPrice) {
        setProductType(accentPrice.productType)
        setPricePerUnit(accentPrice.pricePerUnit)
      }
    }
  }, [dispatch, history, accentPrice, priceId, successUpdate, userInfo])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateAccentPrice({
        _id: priceId,
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
        <h1 className='text-center'>Edit Accent Price</h1>
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default AccentPriceEditScreen
