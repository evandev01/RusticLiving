import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listCustomPaints,
  listCustomPaintDetails,
  deleteCustomPaint,
} from '../../actions/customPaintActions'

const CustomPaintListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const customPaintList = useSelector(state => state.customPaintList)
  const { loading, customPaints, error } = customPaintList

  const customPaintDelete = useSelector(state => state.customPaintDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = customPaintDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listCustomPaints())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteCustomPaint(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/custompaints/create'>
            <Button>
              <i className='fas fa-plus'></i> Create New
            </Button>
          </Link>
        </Col>
      </Row>
      <Link to='/admin/custompaintlist' className='btn btn-dark my-3'>
        Go Back
      </Link>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            customPaints && (
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
                      <th>NAME</th>
                      <th>IMAGE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {customPaints.map(paint => (
                      <tr key={paint._id}>
                        <td>{paint._id}</td>
                        <td>{paint.paintName}</td>
                        <td>{paint.paintImage}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/custompaints/${paint._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={dispatch(
                              listCustomPaintDetails(paint._id)
                            )}
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(paint._id)}
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

export default CustomPaintListScreen
