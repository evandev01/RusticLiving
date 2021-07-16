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
  listCustomStainDetails,
  updateCustomStain,
} from '../../actions/customStainActions'
import { CUSTOM_STAIN_UPDATE_RESET } from '../../constants/customStainConstants'

const CustomStainEditScreen = ({ match, history }) => {
  const stainId = match.params.id

  const [stainName, setStainName] = useState('')
  const [stainImage, setStainImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const customStainDetails = useSelector(state => state.customStainDetails)
  const {
    loading: loadingDetails,
    error: errorDetails,
    customStain,
  } = customStainDetails

  const customStainUpdate = useSelector(state => state.customStainUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = customStainUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOM_STAIN_UPDATE_RESET })
      history.push('/admin/customstainlist')
    }
    if (!customStain.stainName || stainId !== customStain._id) {
      dispatch(listCustomStainDetails(stainId))
    } else {
      if (customStain) {
        setStainName(customStain.stainName)
        setStainImage(customStain.stainImage)
      }
    }
  }, [dispatch, history, customStain, stainId, successUpdate, userInfo])

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

      setStainImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateCustomStain({
        _id: stainId,
        stainName,
        stainImage,
      })
    )
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/customstainlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Edit Stain</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant='danger'>{errorDetails}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='productName'>
              <Form.Label>Stain Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter stain name'
                value={stainName}
                onChange={e => setStainName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='stainImage'>
              <Form.Label>Stain Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
                value={stainImage}
                onChange={e => setStainImage(e.target.value)}
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

export default CustomStainEditScreen
