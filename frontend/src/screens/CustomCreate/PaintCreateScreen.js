import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import CustomProductButtons from '../../components/CustomProductButtons'
import FormContainer from '../../components/FormContainer'
import { createPaint } from '../../actions/customProducts/paintActions'
import { PAINT_CREATE_RESET } from '../../constants/customProductConstants/paintConstants'

const CustomPaintCreateScreen = ({ history }) => {
  const [productType, setProductType] = useState('')
  const [paintName, setPaintName] = useState('')
  const [paintImage, setPaintImage] = useState('')
  const [paintPrice, setPaintPrice] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const paintCreate = useSelector(state => state.paintCreate)
  const { loading, error, success } = paintCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (success) {
      dispatch({ type: PAINT_CREATE_RESET })
      history.push('/admin/custom/paints')
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
      createPaint({
        productType,
        paintName,
        paintImage,
        paintPrice,
      })
    )
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/custom/paints' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Create Paint</h1>
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

            <Form.Group controlId='paintName' className='mt-3'>
              <Form.Label>Paint Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter paint name'
                value={paintName}
                onChange={e => setPaintName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='paintImage' className='mt-3'>
              <Form.Label>Paint Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter paint image URL'
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

            <Form.Group controlId='paintPrice' className='mt-3'>
              <Form.Label>Paint Price PSF</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter paint price psf'
                value={paintPrice}
                onChange={e => setPaintPrice(e.target.value)}
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

export default CustomPaintCreateScreen
