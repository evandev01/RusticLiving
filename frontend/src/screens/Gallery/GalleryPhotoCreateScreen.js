import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import GalleryButtons from '../../components/GalleryButtons'
import { GALLERY_PHOTO_CREATE_RESET } from '../../constants/galleryConstants'
import { createGalleryPhoto } from '../../actions/galleryActions'

const AccentCreateScreen = ({ history }) => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [group, setGroup] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const galleryPhotoCreate = useSelector(state => state.galleryPhotoCreate)
  const { loading, error, success } = galleryPhotoCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
    if (success) {
      dispatch({ type: GALLERY_PHOTO_CREATE_RESET })
      history.push('/admin/gallery')
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

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createGalleryPhoto({
        title,
        image,
        category,
        group,
      })
    )
  }

  return (
    <>
      <GalleryButtons />
      <Link to='/admin/gallery' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Add Gallery Photo</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter image title'
                value={title}
                onChange={e => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='mt-3'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter image URL'
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='category' className='mt-3'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='group' className='mt-3'>
              <Form.Label>Group</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter group name'
                value={group}
                onChange={e => setGroup(e.target.value)}
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
