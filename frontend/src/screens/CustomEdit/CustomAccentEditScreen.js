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
  listCustomAccentDetails,
  updateCustomAccent,
} from '../../actions/customAccentActions'
import { CUSTOM_ACCENT_UPDATE_RESET } from '../../constants/customAccentConstants'

const CustomAccentEditScreen = ({ match, history }) => {
  const accentId = match.params.id

  const [accentName, setAccentName] = useState('')
  const [accentImage, setAccentImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const customAccentDetails = useSelector(state => state.customAccentDetails)
  const {
    loading: loadingDetails,
    error: errorDetails,
    customAccent,
  } = customAccentDetails

  const customAccentUpdate = useSelector(state => state.customAccentUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = customAccentUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOM_ACCENT_UPDATE_RESET })
      history.push('/admin/customaccentlist')
    }
    if (!customAccent.accentName || accentId !== customAccent._id) {
      dispatch(listCustomAccentDetails(accentId))
    } else {
      if (customAccent) {
        setAccentName(customAccent.accentName)
        setAccentImage(customAccent.accentImage)
      }
    }
  }, [dispatch, history, customAccent, accentId, successUpdate, userInfo])

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

      setAccentImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateCustomAccent({
        _id: accentId,
        accentName,
        accentImage,
      })
    )
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/customaccentlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Edit Accent</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant='danger'>{errorDetails}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='productName'>
              <Form.Label>Accent Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter accent name'
                value={accentName}
                onChange={e => setAccentName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='accentImage'>
              <Form.Label>Accent Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
                value={accentImage}
                onChange={e => setAccentImage(e.target.value)}
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

export default CustomAccentEditScreen
