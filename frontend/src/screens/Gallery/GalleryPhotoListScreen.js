import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import GalleryButtons from '../../components/GalleryButtons'
import {
  listGalleryPhotos,
  listGalleryPhotoDetails,
  deleteGalleryPhoto,
} from '../../actions/galleryActions'

const GalleryPhotoListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const galleryPhotoList = useSelector(state => state.galleryPhotoList)
  const { loading, photos, error } = galleryPhotoList

  const galleryPhotoDelete = useSelector(state => state.galleryPhotoDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = galleryPhotoDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listGalleryPhotos())
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteGalleryPhoto(id))
  }

  return (
    <>
      <GalleryButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/galleryphoto/create'>
            <Button>
              <i className='fas fa-plus'></i> Create New
            </Button>
          </Link>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            photos && (
              <>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className='table-sm mt-4'
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>TITLE</th>
                      <th>IMAGE</th>
                      <th>CATEGORY</th>
                      <th>GROUP</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {photos.map(photo => (
                      <tr key={photo._id}>
                        <td>{photo._id}</td>
                        <td>{photo.title}</td>
                        <td>{photo.image}</td>
                        <td>{photo.category}</td>
                        <td>{photo.group}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/galleryphoto/${photo._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={() =>
                              dispatch(listGalleryPhotoDetails(photo._id))
                            }
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(photo._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )
          )}
        </Col>
      </Row>
    </>
  )
}

export default GalleryPhotoListScreen
