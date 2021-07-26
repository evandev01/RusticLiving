import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import FormContainer from '../../../components/FormContainer'
import {
  listDoorPriceDetails,
  updateDoorPrice,
} from '../../../actions/customPrices/doorPriceActions'
import { DOOR_PRICE_UPDATE_RESET } from '../../../constants/priceConstants/doorPriceConstants'

const DoorPriceEditScreen = ({ match, history }) => {
  const priceId = match.params.id

  const [speciesName, setSpeciesName] = useState('')
  const [pricePerSqFt, setPricePerSqFt] = useState('')

  const dispatch = useDispatch()

  const doorPriceDetails = useSelector(state => state.doorPriceDetails)
  const {
    loading: loadingDetails,
    error: errorDetails,
    doorPrice,
  } = doorPriceDetails

  const doorPriceUpdate = useSelector(state => state.doorPriceUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = doorPriceUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DOOR_PRICE_UPDATE_RESET })
      history.push('/admin/customprices/door')
    }
    if (!doorPrice.speciesName || priceId !== doorPrice._id) {
      dispatch(listDoorPriceDetails(priceId))
    } else {
      if (doorPrice) {
        setSpeciesName(doorPrice.speciesName)
        setPricePerSqFt(doorPrice.pricePerSqFt)
      }
    }
  }, [dispatch, history, doorPrice, priceId, successUpdate, userInfo])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateDoorPrice({
        _id: priceId,
        speciesName,
        pricePerSqFt,
      })
    )
  }

  return (
    <>
      <Link to='/admin/customprices/door' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Edit Door Price</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant='danger'>{errorDetails}</Message>
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
              <Form.Label>Accent Image</Form.Label>
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

export default DoorPriceEditScreen
