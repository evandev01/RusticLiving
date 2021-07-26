import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listBases,
  listBaseDetails,
  deleteBase,
} from '../../actions/customProducts/baseActions'

const BaseListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const baseList = useSelector(state => state.baseList)
  const { loading, bases, error } = baseList

  const baseDelete = useSelector(state => state.baseDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = baseDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listBases())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteBase(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/custom/base/create'>
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
            bases && (
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
                      <th>PRICE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bases.map(base => (
                      <tr key={base._id}>
                        <td>{base._id}</td>
                        <td>{base.productType}</td>
                        <td>{base.baseName}</td>
                        <td>{base.baseImage}</td>
                        <td>${base.basePrice}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/custom/base/${base._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={dispatch(listBaseDetails(base._id))}
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(base._id)}
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

export default BaseListScreen
