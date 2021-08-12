import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listEstCompDateDetails,
  updateEstCompDate,
} from '../../actions/customProducts/estCompActions'
import { EST_COMP_UPDATE_RESET } from '../../constants/customProductConstants/estCompConstants'

const EstCompEditScreen = ({ match, history }) => {
  const estCompId = match.params.id

  const [date, setDate] = useState('')

  const dispatch = useDispatch()

  const estCompDetails = useSelector(state => state.estCompDetails)
  const {
    loading: loadingDetails,
    error: errorDetails,
    estCompDate,
  } = estCompDetails

  const estCompUpdate = useSelector(state => state.estCompUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = estCompUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successUpdate) {
      dispatch({ type: EST_COMP_UPDATE_RESET })
      history.push('/admin/custom/estcompdates')
    }

    if (!estCompDate.estCompDate || estCompId !== estCompDate._id) {
      dispatch(listEstCompDateDetails(estCompId))
    } else {
      if (estCompDate.estCompDate) {
        setDate(estCompDate.estCompDate)
      }
    }
  }, [dispatch, history, estCompDate, estCompId, successUpdate, userInfo])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateEstCompDate({
        _id: estCompId,
        estCompDate: date,
      })
    )
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/custom/paints' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Edit Completion Date</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant='danger'>{errorDetails}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='date'>
              <Form.Label>Completion Date</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter completion date'
                value={date}
                onChange={e => setDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-2'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EstCompEditScreen
