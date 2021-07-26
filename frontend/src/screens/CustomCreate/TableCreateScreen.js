import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { createTable } from '../../actions/customProducts/tableActions'
import { TABLE_CREATE_RESET } from '../../constants/customProductConstants/tableConstants'

const TableCreateScreen = ({ history }) => {
  const [speciesName, setSpeciesName] = useState('')
  const [speciesImage, setSpeciesImage] = useState('')
  const [speciesPrice, setSpeciesPrice] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const tableCreate = useSelector(state => state.tableCreate)
  const { loading, error, success } = tableCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (success) {
      dispatch({ type: TABLE_CREATE_RESET })
      history.push('/admin/custom/tables')
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

      setSpeciesImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createTable({
        speciesName,
        speciesImage,
        speciesPrice,
      })
    )
  }

  return (
    <>
      <Link to='/admin/custom/tables' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Create Table</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='speciesName'>
              <Form.Label>Species Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter product name'
                value={speciesName}
                onChange={e => setSpeciesName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='speciesImage' className='mt-3'>
              <Form.Label>Species Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter accent image URL'
                value={speciesImage}
                onChange={e => setSpeciesImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='speciesPrice' className='mt-3'>
              <Form.Label>Species Price PSF</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter species price psf for table'
                value={speciesPrice}
                onChange={e => setSpeciesPrice(e.target.value)}
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

export default TableCreateScreen
