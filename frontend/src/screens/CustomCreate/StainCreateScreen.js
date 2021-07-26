import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import CustomProductButtons from '../../components/CustomProductButtons'
import FormContainer from '../../components/FormContainer'
import { createStain } from '../../actions/customProducts/stainActions'
import { STAIN_CREATE_RESET } from '../../constants/customProductConstants/stainConstants'

const CustomStainCreateScreen = ({ history }) => {
  const [productType, setProductType] = useState('')
  const [stainName, setStainName] = useState('')
  const [stainImage, setStainImage] = useState('')
  const [stainPrice, setStainPrice] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const stainCreate = useSelector(state => state.stainCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = stainCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      dispatch({ type: STAIN_CREATE_RESET })
      history.push('/admin/custom/stains')
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
      createStain({
        productType,
        stainName,
        stainImage,
        stainPrice,
      })
    )
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/custom/stains' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Create Stain</h1>
        {loadingCreate ? (
          <Loader />
        ) : errorCreate ? (
          <Message variant='danger'>{errorCreate}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='productType'>
              <Form.Label>Product Type</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter product type (ex: "Table")'
                value={productType}
                onChange={e => setProductType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='stainName' className='mt-3'>
              <Form.Label>Stain Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter stain name'
                value={stainName}
                onChange={e => setStainName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='stainImage' className='mt-3'>
              <Form.Label>Stain Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter stain image URL'
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

            <Form.Group controlId='stainPrice' className='mt-3'>
              <Form.Label>Stain Price PSF</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter stain price psf'
                value={stainPrice}
                onChange={e => setStainPrice(e.target.value)}
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

export default CustomStainCreateScreen
