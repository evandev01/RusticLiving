import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import CustomProductButtons from '../../components/CustomProductButtons'
import FormContainer from '../../components/FormContainer'
import { createCustomPaint } from '../../actions/customPaintActions'
import { CUSTOM_PAINT_CREATE_RESET } from '../../constants/customPaintConstants'

const CustomPaintCreateScreen = ({ history }) => {
  const [paintName, setPaintName] = useState('')
  const [paintImage, setPaintImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const customPaintCreate = useSelector(state => state.customPaintCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = customPaintCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      dispatch({ type: CUSTOM_PAINT_CREATE_RESET })
      history.push('/admin/custompaintlist')
    }
  }, [dispatch, history, userInfo, successCreate])

  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setPaintImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createCustomPaint({
        paintName,
        paintImage,
      })
    )
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/custompaintlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Create Paint</h1>
        {loadingCreate ? (
          <Loader />
        ) : errorCreate ? (
          <Message variant='danger'>{errorCreate}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='paintName'>
              <Form.Label>Paint Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter paint name'
                value={paintName}
                onChange={e => setPaintName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='estCompletionDate'>
              <Form.Label>Paint Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter paint image URL'
                value={paintImage}
                onChange={e => setPaintImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
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

export default CustomPaintCreateScreen
