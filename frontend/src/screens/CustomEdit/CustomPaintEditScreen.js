import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listCustomPaintDetails,
  updateCustomPaint,
} from '../../actions/customPaintActions'
import { CUSTOM_PAINT_UPDATE_RESET } from '../../constants/customPaintConstants'

const CustomPaintEditScreen = ({ match, history }) => {
  const paintId = match.params.id

  const [paintName, setPaintName] = useState('')
  const [paintImage, setPaintImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const customPaintDetails = useSelector(state => state.customPaintDetails)
  const {
    loading: loadingDetails,
    error: errorDetails,
    customPaint,
  } = customPaintDetails

  const customPaintUpdate = useSelector(state => state.customPaintUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = customPaintUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOM_PAINT_UPDATE_RESET })
      history.push('/admin/custompaintlist')
    }
    if (!customPaint.paintName || paintId !== customPaint._id) {
      dispatch(listCustomPaintDetails(paintId))
    } else {
      if (customPaint) {
        setPaintName(customPaint.paintName)
        setPaintImage(customPaint.paintImage)
      }
    }
  }, [dispatch, history, customPaint, paintId, successUpdate, userInfo])

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
      updateCustomPaint({
        _id: paintId,
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
        <h1 className='text-center'>Edit Paint</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant='danger'>{errorDetails}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='productName'>
              <Form.Label>Paint Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter paint name'
                value={paintName}
                onChange={e => setPaintName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='paintImage'>
              <Form.Label>Paint Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CustomPaintEditScreen
