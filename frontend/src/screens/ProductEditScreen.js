import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
  listProductDetails,
  updateProduct,
  createProduct,
} from '../actions/productActions'
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_RESET,
} from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const productCreate = useSelector(state => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    }
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      history.push('/admin/productlist')
    }
    if (productId) {
      dispatch(listProductDetails(productId))
    }
  }, [dispatch, history, productId, successCreate, successUpdate])

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

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = e => {
    e.preventDefault()
    if (product && productId) {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock,
        })
      )
    } else {
      dispatch(
        createProduct({
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock,
        })
      )
    }
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                onClick={() => {
                  if (product) {
                    setName(product.name)
                  } else return
                }}
                type='name'
                placeholder={product && productId ? product.name : 'Enter name'}
                defaultValue={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                onClick={() => {
                  if (product) {
                    setPrice(product.price)
                  } else return
                }}
                type='number'
                placeholder={
                  product && productId ? product.price : 'Enter price'
                }
                defaultValue={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                onClick={() => {
                  if (product) {
                    setImage(product.image)
                  } else return
                }}
                type='text'
                placeholder={
                  product && productId ? product.image : 'Enter image url'
                }
                defaultValue={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                onClick={() => {
                  if (product) {
                    setBrand(product.brand)
                  } else return
                }}
                type='text'
                placeholder={
                  product && productId ? product.brand : 'Enter brand'
                }
                defaultValue={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                onClick={() => {
                  if (product) {
                    setCountInStock(product.countInStock)
                  } else return
                }}
                type='number'
                placeholder='Enter count in stock'
                defaultValue={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                onClick={() => {
                  if (product) {
                    setCategory(product.category)
                  } else return
                }}
                type='text'
                placeholder={
                  product && productId ? product.category : 'Enter category'
                }
                defaultValue={category}
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                onClick={() => {
                  if (product) {
                    setDescription(product.description)
                  } else return
                }}
                type='text'
                placeholder={
                  product ? product.description : 'Enter description'
                }
                defaultValue={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
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

export default ProductEditScreen
