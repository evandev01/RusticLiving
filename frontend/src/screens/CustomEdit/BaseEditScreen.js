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
  listBaseDetails,
  updateBase,
} from '../../actions/customProducts/baseActions'
import { BASE_UPDATE_RESET } from '../../constants/customProductConstants/baseConstants'

const BaseEditScreen = ({ match, history }) => {
  const baseId = match.params.id

  const [productType, setProductType] = useState('')
  const [baseName, setBaseName] = useState('')
  const [baseImage, setBaseImage] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const baseDetails = useSelector(state => state.baseDetails)
  const { loading: loadingDetails, error: errorDetails, base } = baseDetails

  const baseUpdate = useSelector(state => state.baseUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = baseUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BASE_UPDATE_RESET })
      history.push('/admin/custom/bases')
    }
    if (!base.baseName || baseId !== base._id) {
      dispatch(listBaseDetails(baseId))
    } else {
      if (base) {
        setProductType(base.productType)
        setBaseName(base.baseName)
        setBaseImage(base.baseImage)
        setBasePrice(base.basePrice)
      }
    }
  }, [dispatch, history, base, baseId, successUpdate, userInfo])

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
      updateBase({
        _id: baseId,
        productType,
        baseName,
        baseImage,
        basePrice,
      })
    )
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/custom/bases' className='btn btn-dark my-3'>
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
            <Form.Group controlId='productType'>
              <Form.Label>Product Type</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter product type (ex: "Table")'
                value={productType}
                onChange={e => setProductType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='baseName' className='mt-3'>
              <Form.Label>Base Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter base name'
                value={baseName}
                onChange={e => setBaseName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='baseImage' className='mt-3'>
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

            <Form.Group controlId='basePrice' className='mt-3'>
              <Form.Label>Base Price PSF</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter base price psf'
                value={basePrice}
                onChange={e => setBasePrice(e.target.value)}
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

export default BaseEditScreen
