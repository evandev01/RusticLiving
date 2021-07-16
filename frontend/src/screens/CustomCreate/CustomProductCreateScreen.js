import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { createCustomProduct } from '../../actions/customProductActions'
import { CUSTOM_PRODUCT_CREATE_RESET } from '../../constants/customProductConstants'

const CustomProductCreateScreen = ({ history }) => {
  const [productName, setProductName] = useState('')
  const [estCompletionDate, setEstCompletionDate] = useState('')

  const dispatch = useDispatch()

  const customProductCreate = useSelector(state => state.customProductCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = customProductCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      dispatch({ type: CUSTOM_PRODUCT_CREATE_RESET })
      history.push('/admin/customproductlist')
    }
  }, [dispatch, history, userInfo, successCreate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createCustomProduct({
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
        <h1 className='text-center'>Create Product</h1>
        {loadingCreate ? (
          <Loader />
        ) : errorCreate ? (
          <Message variant='danger'>{errorCreate}</Message>
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
                placeholder='Enter estimated completion date'
                value={estCompletionDate}
                onChange={e => setEstCompletionDate(e.target.value)}
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

export default CustomProductCreateScreen
