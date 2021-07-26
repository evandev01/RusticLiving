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
  listPaintDetails,
  updatePaint,
} from '../../actions/customProducts/paintActions'
import { PAINT_UPDATE_RESET } from '../../constants/customProductConstants/paintConstants'

const PaintEditScreen = ({ match, history }) => {
  const paintId = match.params.id

  const [productType, setProductType] = useState('')
  const [paintName, setPaintName] = useState('')
  const [paintImage, setPaintImage] = useState('')
  const [paintPrice, setPaintPrice] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const paintDetails = useSelector(state => state.paintDetails)
  const { loading: loadingDetails, error: errorDetails, paint } = paintDetails

  const paintUpdate = useSelector(state => state.paintUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = paintUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PAINT_UPDATE_RESET })
      history.push('/admin/custom/paints')
    }
    if (!paint.paintName || paintId !== paint._id) {
      dispatch(listPaintDetails(paintId))
    } else {
      if (paint) {
        setProductType(paint.productType)
        setPaintName(paint.paintName)
        setPaintImage(paint.paintImage)
        setPaintPrice(paint.paintPrice)
      }
    }
  }, [dispatch, history, paint, paintId, successUpdate, userInfo])

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
      updatePaint({
        _id: paintId,
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
        <h1 className='text-center'>Edit Paint</h1>
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

            <Form.Group controlId='paintName' className='mt-3'>
              <Form.Label>Paint Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter base name'
                value={paintName}
                onChange={e => setPaintName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='paintImage' className='mt-3'>
              <Form.Label>Paint Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
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
                type='number'
                placeholder='Enter paint price psf'
                value={paintPrice}
                onChange={e => setPaintPrice(e.target.value)}
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

export default PaintEditScreen
