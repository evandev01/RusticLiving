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
  listAccentDetails,
  updateAccent,
} from '../../actions/customProducts/accentActions'
import { ACCENT_UPDATE_RESET } from '../../constants/customProductConstants/accentConstants'

const AccentEditScreen = ({ match, history }) => {
  const accentId = match.params.id

  const [productType, setProductType] = useState('')
  const [accentName, setAccentName] = useState('')
  const [accentImage, setAccentImage] = useState('')
  const [accentPrice, setAccentPrice] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const accentDetails = useSelector(state => state.accentDetails)
  const { loading: loadingDetails, error: errorDetails, accent } = accentDetails

  const accentUpdate = useSelector(state => state.accentUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = accentUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ACCENT_UPDATE_RESET })
      history.push('/admin/custom/accents')
    }
    if (!accent.accentName || accentId !== accent._id) {
      dispatch(listAccentDetails(accentId))
    } else {
      if (accent) {
        setProductType(accent.productType)
        setAccentName(accent.accentName)
        setAccentImage(accent.accentImage)
        setAccentPrice(accent.accentPrice)
      }
    }
  }, [dispatch, history, accent, accentId, successUpdate, userInfo])

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
      updateAccent({
        _id: accentId,
        productType,
        accentName,
        accentImage,
        accentPrice,
      })
    )
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/custom/accents' className='btn btn-dark my-3'>
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
            <Form.Group controlId='productType'>
              <Form.Label>Product Type</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter product type (ex: "Table")'
                value={productType}
                onChange={e => setProductType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='accentName' className='mt-3'>
              <Form.Label>Accent Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter accent name'
                value={accentName}
                onChange={e => setAccentName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='accentImage' className='mt-3'>
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

            <Form.Group controlId='accentPrice' className='mt-3'>
              <Form.Label>Accent Price PSF</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter accent price psf'
                value={accentPrice}
                onChange={e => setAccentPrice(e.target.value)}
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

export default AccentEditScreen
