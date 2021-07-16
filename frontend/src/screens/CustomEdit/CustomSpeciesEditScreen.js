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
  listCustomSpeciesDetails,
  updateCustomSpecies,
} from '../../actions/customSpeciesActions'
import { CUSTOM_SPECIES_UPDATE_RESET } from '../../constants/customSpeciesConstants'

const CustomSpeciesEditScreen = ({ match, history }) => {
  const speciesId = match.params.id

  const [speciesName, setSpeciesName] = useState('')
  const [speciesImage, setSpeciesImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const customSpeciesDetails = useSelector(state => state.customSpeciesDetails)
  const {
    loading: loadingDetails,
    error: errorDetails,
    customSpecies,
  } = customSpeciesDetails

  const customSpeciesUpdate = useSelector(state => state.customSpeciesUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = customSpeciesUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOM_SPECIES_UPDATE_RESET })
      history.push('/admin/customspecieslist')
    }
    if (!customSpecies.speciesName || speciesId !== customSpecies._id) {
      dispatch(listCustomSpeciesDetails(speciesId))
    } else {
      if (customSpecies) {
        setSpeciesName(customSpecies.speciesName)
        setSpeciesImage(customSpecies.speciesImage)
      }
    }
  }, [dispatch, history, customSpecies, speciesId, successUpdate, userInfo])

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
      updateCustomSpecies({
        _id: speciesId,
        speciesName,
        speciesImage,
      })
    )
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/customspecieslist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Edit Species</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant='danger'>{errorDetails}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='productName'>
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

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CustomSpeciesEditScreen
