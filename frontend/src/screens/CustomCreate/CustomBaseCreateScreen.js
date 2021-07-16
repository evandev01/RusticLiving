import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import CustomProductButtons from '../../components/CustomProductButtons'
import FormContainer from '../../components/FormContainer'
import { createCustomBase } from '../../actions/customBaseActions'
import { CUSTOM_BASE_CREATE_RESET } from '../../constants/customBaseConstants'

const CustomBaseCreateScreen = ({ history }) => {
  const [baseName, setBaseName] = useState('')
  const [baseImage, setBaseImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const customBaseCreate = useSelector(state => state.customBaseCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = customBaseCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      dispatch({ type: CUSTOM_BASE_CREATE_RESET })
      history.push('/admin/custombaselist')
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
      createCustomBase({
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
        <h1 className='text-center'>Create Base</h1>
        {loadingCreate ? (
          <Loader />
        ) : errorCreate ? (
          <Message variant='danger'>{errorCreate}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='baseName'>
              <Form.Label>Base Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter base name'
                value={baseName}
                onChange={e => setBaseName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='estCompletionDate'>
              <Form.Label>Base Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter base image URL'
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
              Save
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CustomBaseCreateScreen
