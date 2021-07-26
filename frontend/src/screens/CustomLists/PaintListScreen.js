import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listPaints,
  listPaintDetails,
  deletePaint,
} from '../../actions/customProducts/paintActions'

const PaintListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const paintList = useSelector(state => state.paintList)
  const { loading, paints, error } = paintList

  const paintDelete = useSelector(state => state.paintDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = paintDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listPaints())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deletePaint(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/custom/paint/create'>
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
            paints && (
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
                      <th>PRODUCT</th>
                      <th>NAME</th>
                      <th>IMAGE</th>
                      <th>PRICE/SQFT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paints.map(paint => (
                      <tr key={paint._id}>
                        <td>{paint._id}</td>
                        <td>{paint.productType}</td>
                        <td>{paint.paintName}</td>
                        <td>{paint.paintImage}</td>
                        <td>{paint.paintPrice}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/custom/paint/${paint._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={dispatch(listPaintDetails(paint._id))}
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

export default PaintListScreen
