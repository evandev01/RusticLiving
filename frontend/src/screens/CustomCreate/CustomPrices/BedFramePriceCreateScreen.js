import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import FormContainer from '../../../components/FormContainer'
import { createBedFramePrice } from '../../../actions/customPrices/bedFramePriceActions'
import { BEDFRAME_PRICE_CREATE_RESET } from '../../../constants/priceConstants/bedFramePriceConstants'

const BedFramePriceCreateScreen = ({ history }) => {
  const [speciesName, setSpeciesName] = useState('')
  const [pricePerSqFt, setPricePerSqFt] = useState('')

  const dispatch = useDispatch()

  const bedFramePriceCreate = useSelector(state => state.bedFramePriceCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = bedFramePriceCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      dispatch({ type: BEDFRAME_PRICE_CREATE_RESET })
      history.push('/admin/customprices/bedframe')
    }
  }, [dispatch, history, userInfo, successCreate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createBedFramePrice({
        speciesName,
        pricePerSqFt,
      })
    )
  }

  return (
    <>
      {/* <CustomProductButtons /> */}
      <Link to='/admin/customprices/bedframe' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Create Bed Frame Price</h1>
        {loadingCreate ? (
          <Loader />
        ) : errorCreate ? (
          <Message variant='danger'>{errorCreate}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='speciesName'>
              <Form.Label>Species Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter species name'
                value={speciesName}
                onChange={e => setSpeciesName(e.target.value)}
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

export default BedFramePriceCreateScreen
