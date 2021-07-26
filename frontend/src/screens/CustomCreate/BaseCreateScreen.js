import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import CustomProductButtons from '../../components/CustomProductButtons'
import FormContainer from '../../components/FormContainer'
import { createBase } from '../../actions/customProducts/baseActions'
import { BASE_CREATE_RESET } from '../../constants/customProductConstants/baseConstants'

const BaseCreateScreen = ({ history }) => {
  const [productType, setProductType] = useState('')
  const [baseName, setBaseName] = useState('')
  const [baseImage, setBaseImage] = useState('')
  //////////////////////////////////////////////////////
  // ASK JUSTIN ABOUT PRICING!!!!!!!!!!!
  // const [speciesName, setSpeciesName] = useState('')
  // const [speciesImage, setSpeciesImage] = useState('')
  //////////////////////////////////////////////////////
  const [basePrice, setBasePrice] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const baseCreate = useSelector(state => state.baseCreate)
  const { loading, error, success } = baseCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (success) {
      dispatch({ type: BASE_CREATE_RESET })
      history.push('/admin/custom/bases')
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
      createBase({
        productType,
        baseName,
        baseImage,
        // speciesName,
        // speciesImage,
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
        <h1 className='text-center'>Create Base</h1>
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
                placeholder='Enter base name (ex: "Table")'
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

            <Form.Group controlId='basePrice' className='mt-3'>
              <Form.Label>Base Price Per Unit</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter base price per unit'
                value={basePrice}
                onChange={e => setBasePrice(e.target.value)}
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

export default BaseCreateScreen
