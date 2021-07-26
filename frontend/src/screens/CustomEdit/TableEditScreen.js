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
  listTableDetails,
  updateTable,
} from '../../actions/customProducts/tableActions'
import { TABLE_UPDATE_RESET } from '../../constants/customProductConstants/tableConstants'

const TableEditScreen = ({ match, history }) => {
  const tableId = match.params.id

  const [speciesName, setSpeciesName] = useState('')
  const [speciesImage, setSpeciesImage] = useState('')
  const [speciesPrice, setSpeciesPrice] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const tableDetails = useSelector(state => state.tableDetails)
  const { loading: loadingDetails, error: errorDetails, table } = tableDetails

  const tableUpdate = useSelector(state => state.tableUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = tableUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TABLE_UPDATE_RESET })
      history.push('/admin/custom/tables')
    }
    if (!table.speciesName || tableId !== table._id) {
      dispatch(listTableDetails(tableId))
    } else {
      if (table) {
        setSpeciesName(table.speciesName)
        setSpeciesImage(table.speciesImage)
        setSpeciesPrice(table.speciesPrice)
      }
    }
  }, [dispatch, history, table, tableId, successUpdate, userInfo])

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
      updateTable({
        _id: tableId,
        speciesName,
        speciesImage,
        speciesPrice,
      })
    )
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/custom/tables' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Edit Table</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant='danger'>{errorDetails}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='speciesName'>
              <Form.Label>Species Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter species name'
                value={speciesName}
                onChange={e => setSpeciesName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='speciesImage'>
              <Form.Label>Species Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
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
              <Form.Label>Species PSF</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter species price psf for table'
                value={speciesPrice}
                onChange={e => setSpeciesPrice(e.target.value)}
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

export default TableEditScreen
