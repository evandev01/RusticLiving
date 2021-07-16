import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import CustomProductButtons from '../../components/CustomProductButtons'
import FormContainer from '../../components/FormContainer'
import { createCustomSpecies } from '../../actions/customSpeciesActions'
import { CUSTOM_SPECIES_CREATE_RESET } from '../../constants/customSpeciesConstants'

const CustomSpeciesCreateScreen = ({ history }) => {
  const [speciesName, setSpeciesName] = useState('')
  const [speciesImage, setSpeciesImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const customSpeciesCreate = useSelector(state => state.customSpeciesCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = customSpeciesCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      dispatch({ type: CUSTOM_SPECIES_CREATE_RESET })
      history.push('/admin/customspecieslist')
    }
  }, [dispatch, history, userInfo, successCreate])

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
      createCustomSpecies({
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
        <h1 className='text-center'>Create Species</h1>
        {loadingCreate ? (
          <Loader />
        ) : errorCreate ? (
          <Message variant='danger'>{errorCreate}</Message>
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

            <Form.Group controlId='estCompletionDate'>
              <Form.Label>Species Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter species image URL'
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
              Save
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CustomSpeciesCreateScreen
