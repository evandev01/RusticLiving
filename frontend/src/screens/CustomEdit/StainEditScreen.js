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
  listStainDetails,
  updateStain,
} from '../../actions/customProducts/stainActions'
import { STAIN_UPDATE_RESET } from '../../constants/customProductConstants/stainConstants'

const StainEditScreen = ({ match, history }) => {
  const stainId = match.params.id

  const [productType, setProductType] = useState('')
  const [stainName, setStainName] = useState('')
  const [stainImage, setStainImage] = useState('')
  const [stainPrice, setStainPrice] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const stainDetails = useSelector(state => state.stainDetails)
  const { loading: loadingDetails, error: errorDetails, stain } = stainDetails

  const stainUpdate = useSelector(state => state.stainUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = stainUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STAIN_UPDATE_RESET })
      history.push('/admin/custom/stains')
    }
    if (!stain.stainName || stainId !== stain._id) {
      dispatch(listStainDetails(stainId))
    } else {
      if (stain) {
        setProductType(stain.productType)
        setStainName(stain.stainName)
        setStainImage(stain.stainImage)
        setStainPrice(stain.stainPrice)
      }
    }
  }, [dispatch, history, stain, stainId, successUpdate, userInfo])

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
      updateStain({
        _id: stainId,
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
        <h1 className='text-center'>Edit Stain</h1>
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

            <Form.Group controlId='stainPrice' className='mt-3'>
              <Form.Label>Stain Price PSF</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter stain price psf'
                value={stainPrice}
                onChange={e => setStainPrice(e.target.value)}
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

export default StainEditScreen
