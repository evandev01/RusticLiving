import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import CustomProductButtons from '../../components/CustomProductButtons'
import FormContainer from '../../components/FormContainer'
import { createAccent } from '../../actions/customProducts/accentActions'
import { ACCENT_CREATE_RESET } from '../../constants/customProductConstants/accentConstants'

const AccentCreateScreen = ({ history }) => {
  const [productType, setProductType] = useState('')
  const [accentName, setAccentName] = useState('')
  const [accentImage, setAccentImage] = useState('')
  const [accentPrice, setAccentPrice] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const accentCreate = useSelector(state => state.accentCreate)
  const { loading, error, success } = accentCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (success) {
      dispatch({ type: ACCENT_CREATE_RESET })
      history.push('/admin/custom/accents')
    }
  }, [dispatch, history, userInfo, success])

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
      createAccent({
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
        <h1 className='text-center'>Create Accent</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
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
                placeholder='Enter accent image URL'
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
              <Form.Label>Accent Price Per Unit</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter accent price'
                value={accentPrice}
                onChange={e => setAccentPrice(e.target.value)}
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

export default AccentCreateScreen
