import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {
  updateCustomProduct,
  listCustomProductDetails,
} from '../../actions/customProductActions'
import { CUSTOM_PRODUCT_UPDATE_RESET } from '../../constants/customProductConstants'

const CustomProductEditScreen = ({ match, history }) => {
  const customProductId = match.params.id

  const [productName, setProductName] = useState('')
  const [estCompletionDate, setEstCompletionDate] = useState('')

  const dispatch = useDispatch()

  const customProductDetails = useSelector(state => state.customProductDetails)
  const {
    loading: loadingDetails,
    error: errorDetails,
    customProduct,
  } = customProductDetails

  const customProductUpdate = useSelector(state => state.customProductUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = customProductUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOM_PRODUCT_UPDATE_RESET })
      history.push('/admin/customproductlist')
    } else {
      if (!customProduct.productName || customProduct._id !== customProductId) {
        dispatch(listCustomProductDetails(customProductId))
      } else {
        if (customProduct) {
          setProductName(customProduct.productName)
          setEstCompletionDate(customProduct.estCompletionDate)
        }
      }
    }
  }, [dispatch, history, customProductId, customProduct, successUpdate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateCustomProduct({
        _id: customProductId,
        productName,
        estCompletionDate,
      })
    )
  }

  return (
    <>
      <Link to='/admin/customproductlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant='danger'>{errorDetails}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='productName'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter product name'
                value={productName}
                onChange={e => setProductName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='estCompletionDate'>
              <Form.Label>Estimated Date of Completion</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter estimated date of completion'
                value={estCompletionDate}
                onChange={e => setEstCompletionDate(e.target.value)}
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

export default CustomProductEditScreen
