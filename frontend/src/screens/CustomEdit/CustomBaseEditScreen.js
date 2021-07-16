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
  listCustomBaseDetails,
  updateCustomBase,
} from '../../actions/customBaseActions'
import { CUSTOM_BASE_UPDATE_RESET } from '../../constants/customBaseConstants'

const CustomBaseEditScreen = ({ match, history }) => {
  const baseId = match.params.id

  const [baseName, setBaseName] = useState('')
  const [baseImage, setBaseImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const customBaseDetails = useSelector(state => state.customBaseDetails)
  const {
    loading: loadingDetails,
    error: errorDetails,
    customBase,
  } = customBaseDetails

  const customBaseUpdate = useSelector(state => state.customBaseUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = customBaseUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOM_BASE_UPDATE_RESET })
      history.push('/admin/custombaselist')
    }
    if (!customBase.baseName || baseId !== customBase._id) {
      dispatch(listCustomBaseDetails(baseId))
    } else {
      if (customBase) {
        setBaseName(customBase.baseName)
        setBaseImage(customBase.baseImage)
      }
    }
  }, [dispatch, history, customBase, baseId, successUpdate, userInfo])

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

      setBaseImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateCustomBase({
        _id: baseId,
        baseName,
        baseImage,
      })
    )
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/custombaselist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Edit Base</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant='danger'>{errorDetails}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='productName'>
              <Form.Label>Base Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter base name'
                value={baseName}
                onChange={e => setBaseName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='baseImage'>
              <Form.Label>Base Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
                value={baseImage}
                onChange={e => setBaseImage(e.target.value)}
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

export default CustomBaseEditScreen
