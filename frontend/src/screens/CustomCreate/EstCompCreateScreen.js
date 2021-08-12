import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import CustomProductButtons from '../../components/CustomProductButtons'
import FormContainer from '../../components/FormContainer'
import { createEstCompDate } from '../../actions/customProducts/estCompActions'
import { EST_COMP_CREATE_RESET } from '../../constants/customProductConstants/estCompConstants'

const EstCompCreateScreen = ({ history }) => {
  const [date, setDate] = useState('')

  const dispatch = useDispatch()

  const estCompCreate = useSelector(state => state.estCompCreate)
  const { loading, error, success } = estCompCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (success) {
      dispatch({ type: EST_COMP_CREATE_RESET })
      history.push('/admin/custom/estcompdate')
    }
  }, [dispatch, history, userInfo, success])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createEstCompDate({
        date,
      })
    )
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/custom/estcompdate' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Create Completion Date</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
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
              Save
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EstCompCreateScreen
